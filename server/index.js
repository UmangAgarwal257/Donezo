const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { Resend } = require("resend");
const mongoose = require("mongoose");
const emailTemplates = require("./templates/emailTemplates");
const moment = require("moment-timezone");
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

// Import models and templates
const Recipient = require("./models/recipient");
const EmailLog = require("./models/emailLog");

// Email schema
const emailSchema = z.string().email("Invalid email format");

// Function to send email and log the result
async function sendEmailAndLog(
  recipient,
  template,
  style = "elonMusk",
  type = "weeklyCheck"
) {
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
      template: { style, type },
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
      template: { style, type },
    });

    console.error(`Failed to send email to ${recipient.email}:`, err);
    return { success: false, error: err.message };
  }
}

// Schedule weekly emails (Every Monday at 9 AM UTC)
cron.schedule("* * * * *", async () => {
  try {
    const recipients = await Recipient.find({ active: true });

    for (const recipient of recipients) {
      const recipientTime = moment().tz(recipient.timezone);

      // Check if it's 9 AM in the recipient's timezone and it's Monday
      if (
        recipientTime.hours() === 9 &&
        recipientTime.minutes() === 0 &&
        recipientTime.day() === 1
      ) {
        // Check if we haven't sent an email in the last hour to prevent duplicates
        const lastEmailedAt = recipient.lastEmailedAt
          ? moment(recipient.lastEmailedAt)
          : moment(0);
        if (recipientTime.diff(lastEmailedAt, "hours") < 1) {
          continue;
        }

        console.log(
          `Sending email to ${recipient.email} (${recipient.timezone})`
        );

        try {
          await sendEmailAndLog(
            recipient,
            emailTemplates[recipient.style || "elonMusk"],
            recipient.style || "elonMusk",
            "weeklyCheck"
          );
          recipient.lastEmailedAt = new Date();
          await recipient.save();
          console.log(`Successfully sent email to ${recipient.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${recipient.email}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Cron job error:", error);
  }
});

// Routes
app.use("/api/recipients", recipientRoutes);
app.use("/api/logs", emailLogRoutes);

// New registration endpoint
app.post("/api/register", async (req, res) => {
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
      return res.status(400).json({ error: "Invalid timezone" });
    }

    // Calculate next Monday at 9 AM in the user's timezone
    const now = moment().tz(timezone);
    let nextMonday = moment.tz(timezone);
    nextMonday.day(1).hour(9).minute(0).second(0).millisecond(0);

    // If it's already past 9 AM on Monday, schedule for next week
    if (now.isAfter(nextMonday)) {
      nextMonday.add(1, "week");
    }

    const existingRecipient = await Recipient.findOne({ email });
    if (existingRecipient) {
      existingRecipient.name = name;
      existingRecipient.style = style;
      existingRecipient.timezone = timezone;
      existingRecipient.active = true;
      await existingRecipient.save();
      return res.json({
        message: "Updated successfully",
        nextEmailDate: nextMonday.toISOString(),
      });
    }

    const newRecipient = new Recipient({
      email,
      name,
      style,
      timezone,
      active: true,
    });
    await newRecipient.save();

    res.json({
      message: "Registered successfully",
      nextEmailDate: nextMonday.toISOString(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Weekly email job scheduled for Mondays at 9 AM UTC");
});
