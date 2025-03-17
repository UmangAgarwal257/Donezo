const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");
const mongoose = require("mongoose");
const emailTemplates = require("./templates/emailTemplates");
const moment = require('moment-timezone');
const { z } = require("zod");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const recipientRoutes = require("./routes/recipients");
const emailLogRoutes = require("./routes/emailLogs");

// Import models
const Recipient = require("./models/recipient");
const EmailLog = require("./models/emailLog");

// Email schema
const emailSchema = z.string().email("Invalid email format");

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

// Routes
app.use("/api/recipients", recipientRoutes);
app.use("/api/logs", emailLogRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// New registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { style, recipient } = req.body;
    const { email, name, timezone } = recipient;

    // Validate email
    try {
      emailSchema.parse(email);
    } catch (zodError) {
      return res.status(400).json({ error: zodError.errors[0].message });
    }

    // Validate timezone
    if (!moment.tz.zone(timezone)) {
      return res.status(400).json({ error: 'Invalid timezone' });
    }

    // Calculate next Monday at 9 AM in the user's timezone
    const now = moment().tz(timezone);
    let nextMonday = moment().tz(timezone);
    nextMonday.day(1).hour(9).minute(0).second(0).millisecond(0);
    
    // If today is Monday and it's past 9 AM, or if it's after Monday,
    // move to next week
    if (
      (now.day() === 1 && now.hour() >= 9) ||
      now.day() > 1
    ) {
      nextMonday.add(1, 'week');
    }

    const existingRecipient = await Recipient.findOne({ email });
    if (existingRecipient) {
      existingRecipient.name = name;
      existingRecipient.style = style;
      existingRecipient.timezone = timezone;
      existingRecipient.active = true;
      await existingRecipient.save();
      return res.json({ 
        message: 'Updated successfully',
        nextEmailDate: nextMonday.toISOString()
      });
    }

    const newRecipient = new Recipient({
      email,
      name,
      style,
      timezone,
      active: true
    });
    await newRecipient.save();

    res.json({ 
      message: 'Registered successfully',
      nextEmailDate: nextMonday.toISOString()
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register' });
  }
});

app.get('/api/system-status', async (req, res) => {
  try {
    const recipients = await Recipient.find({ active: true });
    const status = recipients.map(r => {
      const recipientTime = moment().tz(r.timezone);
      
      // Calculate next Monday 9 AM
      let nextMonday = moment().tz(r.timezone);
      nextMonday.day(1).hour(9).minute(0).second(0).millisecond(0);
      
      // If today is Monday and it's past 9 AM, or if it's after Monday,
      // move to next week
      if (
        (recipientTime.day() === 1 && recipientTime.hour() >= 9) ||
        recipientTime.day() > 1
      ) {
        nextMonday.add(1, 'week');
      }

      return {
        email: r.email,
        timezone: r.timezone,
        localTime: recipientTime.format('dddd HH:mm'),
        nextEmail: nextMonday.format('YYYY-MM-DD HH:mm z'),
        lastEmailedAt: r.lastEmailedAt
      };
    });
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Temporary endpoint for today's delayed emails
app.post('/api/send-delayed-emails', async (req, res) => {
  try {
    const recipients = await Recipient.find({ 
      active: true,
      lastEmailedAt: null, // Only those who haven't received email
      timezone: "Asia/Calcutta" // Specifically for Indian users
    });

    console.log(`Found ${recipients.length} recipients for delayed emails`);
    
    const results = [];
    for (const recipient of recipients) {
      try {
        const result = await sendEmailAndLog(
          recipient, 
          emailTemplates[recipient.style || 'elonMusk'], 
          recipient.style || 'elonMusk', 
          'weeklyCheck'
        );
        results.push({ email: recipient.email, success: true, ...result });
      } catch (error) {
        results.push({ email: recipient.email, success: false, error: error.message });
      }
    }
    
    res.json({ 
      message: 'Delayed emails sent',
      count: results.length,
      results 
    });
  } catch (error) {
    console.error('Delayed email error:', error);
    res.status(500).json({ error: 'Failed to send delayed emails' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
