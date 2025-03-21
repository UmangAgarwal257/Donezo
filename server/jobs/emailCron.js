const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Resend } = require("resend");
const moment = require('moment-timezone');
const emailTemplates = require("../templates/emailTemplates");
const Recipient = require("../models/recipient");
const EmailLog = require("../models/emailLog");
const axios = require('axios');

// Load environment variables
dotenv.config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send email and log the result
async function sendEmailAndLog(recipient, template, style = 'elonMusk', type = 'weeklyCheck') {
  try {
    const emailTemplate = emailTemplates[style].templates[type];
    const data = await resend.emails.send({
      from: emailTemplates[style].from,
      to: recipient.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html(recipient.name),
    });

    // Log the successful email
    await EmailLog.create({
      recipient: recipient._id,
      status: "sent",
      sentAt: new Date(),
      template: { style, type }
    });

    recipient.lastEmailedAt = new Date();
    await recipient.save();

    console.log(`Email sent successfully to ${recipient.email}`);
    return { success: true, emailId: data.id };
  } catch (err) {
    // Log the failed email
    await EmailLog.create({
      recipient: recipient._id,
      status: "failed",
      error: err.message,
      sentAt: new Date(),
      template: { style, type }
    });

    console.error(`Failed to send email to ${recipient.email}:`, err);
    return { success: false, error: err.message };
  }
}

async function notifyError(error) {
  if (process.env.DISCORD_WEBHOOK_URL) {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: `❌ Email Cron Error: ${error.message}`
    });
  }
}

async function notifySuccess(sentCount) {
  if (process.env.DISCORD_WEBHOOK_URL) {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: `✅ Email Cron Success: Sent ${sentCount} emails`
    });
  }
}

async function runEmailJob() {
  try {
    console.log('Starting email job at:', new Date().toISOString());
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const recipients = await Recipient.find({ active: true });
    console.log(`Found ${recipients.length} active recipients`);
    
    for (const recipient of recipients) {
      const recipientTime = moment().tz(recipient.timezone);
      const lastEmailedAt = recipient.lastEmailedAt ? moment(recipient.lastEmailedAt) : moment(0);
      
      // Detailed logging for debugging
      console.log(`\nChecking recipient: ${recipient.email}`);
      console.log(`Timezone: ${recipient.timezone}`);
      console.log(`Local time: ${recipientTime.format('dddd HH:mm')}`);
      console.log(`Last emailed: ${lastEmailedAt.format('YYYY-MM-DD HH:mm')}`);
      
      // Check if it's Monday
      const isMonday = recipientTime.day() === 1;
      
      // Check if it's 9 AM
      const isNineAM = recipientTime.hours() === 9;
      
      // Check if we haven't sent an email this week
      // Calculate the start of this week's Monday
      const thisWeekMonday = moment().tz(recipient.timezone)
        .startOf('week').add(1, 'day')
        .hour(9).minute(0).second(0);
      
      const noEmailThisWeek = !lastEmailedAt || lastEmailedAt.isBefore(thisWeekMonday);

      console.log(`Is Monday? ${isMonday}`);
      console.log(`Is 9 AM? ${isNineAM}`);
      console.log(`No email this week? ${noEmailThisWeek}`);

      if (isMonday && isNineAM && noEmailThisWeek) {
        console.log(`✉️ Sending email to ${recipient.email}`);
        
        try {
          await sendEmailAndLog(
            recipient, 
            emailTemplates[recipient.style || 'elonMusk'], 
            recipient.style || 'elonMusk', 
            'weeklyCheck'
          );
          console.log(`Successfully sent email to ${recipient.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${recipient.email}:`, error);
        }
      } else {
        console.log(`⏭️ Skipping ${recipient.email} - Next email scheduled for next Monday 9 AM`);
      }
    }
  } catch (error) {
    console.error('Email job error:', error);
    await notifyError(error);
  } finally {
    await mongoose.connection.close();
    console.log("Closed MongoDB connection");
  }
}

// Run the job
runEmailJob()
  .then(() => {
    console.log('Email job completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });