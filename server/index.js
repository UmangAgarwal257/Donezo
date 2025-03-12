const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { Resend } = require("resend");
const mongoose = require("mongoose");
const emailTemplates = require("./templates/emailTemplates");

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

// Use routes
app.use("/api/recipients", recipientRoutes);
app.use("/api/logs", emailLogRoutes);

// Test endpoint to manually trigger email sending
app.post("/api/test/send-email", async (req, res) => {
  try {
    const Recipients = require("./models/recipient");
    const EmailLog = require("./models/emailLog");
    const { style = 'elonMusk', type = 'weeklyCheck', recipient } = req.body;

    // Validate template style and type
    if (!emailTemplates[style]) {
      return res.status(400).json({ message: 'Invalid template style' });
    }
    if (!emailTemplates[style].templates[type]) {
      return res.status(400).json({ message: 'Invalid template type' });
    }

    const template = emailTemplates[style].templates[type];
    const results = [];

    try {
      if (recipient) {
        // Single test email
        console.log('Attempting to send test email to:', recipient.email);
        const emailResult = await resend.emails.send({
          from: emailTemplates[style].from,
          to: recipient.email,
          subject: template.subject,
          html: template.html(recipient.name),
        });
        console.log('Test email sent successfully:', emailResult);

        results.push({
          recipient: recipient.email,
          status: "success",
          emailId: emailResult.id,
        });
      } else {
        // Send to all active recipients
        const recipients = await Recipients.find({ active: true });
        for (const recipient of recipients) {
          const emailResult = await resend.emails.send({
            from: emailTemplates[style].from,
            to: recipient.email,
            subject: template.subject,
            html: template.html(recipient.name),
          });

          // Log successful email
          const log = await EmailLog.create({
            recipient: recipient._id,
            status: "sent",
            sentAt: new Date(),
            template: { style, type }
          });

          results.push({
            recipient: recipient.email,
            status: "success",
            emailId: emailResult.id,
          });
        }
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      results.push({
        recipient: recipient?.email || 'unknown',
        status: "failed",
        error: error.message,
      });
    }

    res.json({
      message: "Test emails processed",
      results,
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Weekly email scheduler
cron.schedule(
  "0 9 * * 1",
  async () => {
    try {
      const Recipients = require("./models/recipient");
      const EmailLog = require("./models/emailLog");

      const recipients = await Recipients.find({ active: true });
      const template = emailTemplates.elonMusk.templates.weeklyCheck;

      for (const recipient of recipients) {
        try {
          await resend.emails.send({
            from: emailTemplates.elonMusk.from,
            to: recipient.email,
            subject: template.subject,
            html: template.html(recipient.name),
          });

          // Log successful email
          await EmailLog.create({
            recipient: recipient._id,
            status: "sent",
            sentAt: new Date(),
            template: { style: 'elonMusk', type: 'weeklyCheck' }
          });
        } catch (error) {
          // Log failed email
          await EmailLog.create({
            recipient: recipient._id,
            status: "failed",
            error: error.message,
            sentAt: new Date(),
            template: { style: 'elonMusk', type: 'weeklyCheck' }
          });
        }
      }
    } catch (error) {
      console.error("Email scheduler error:", error);
    }
  },
  {
    timezone: "UTC",
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
