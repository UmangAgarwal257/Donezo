const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { Resend } = require("resend");
const mongoose = require("mongoose");

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

    const recipients = await Recipients.find({ active: true });

    const results = [];
    for (const recipient of recipients) {
      try {
        const emailResult = await resend.emails.send({
          from: "Elon Musk <elon_musk@umangcodes.tech>",
          to: recipient.email,
          subject: "Weekly Progress Check (Test)",
          html: `
            <h2>Hey there! 👋</h2>
            <p>This is a test email from Elon Bot.</p>
            <p>What did you get done this week?</p>
            
          `,
        });

        // Log successful email
        const log = await EmailLog.create({
          recipient: recipient._id,
          status: "sent",
          sentAt: new Date(),
        });

        results.push({
          recipient: recipient.email,
          status: "success",
          emailId: emailResult.id,
        });
      } catch (error) {
        // Log failed email
        await EmailLog.create({
          recipient: recipient._id,
          status: "failed",
          error: error.message,
          sentAt: new Date(),
        });

        results.push({
          recipient: recipient.email,
          status: "failed",
          error: error.message,
        });
      }
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

      for (const recipient of recipients) {
        try {
          await resend.emails.send({
            from: "Elon Musk <elon_musk@umangcodes.tech>",
            to: recipient.email,
            subject: "Weekly Progress Check",
            html: `
            <h2>Hey there! 👋</h2>
            <p>What did you get done this week?</p>
           
          `,
          });

          // Log successful email
          await EmailLog.create({
            recipient: recipient._id,
            status: "sent",
            sentAt: new Date(),
          });
        } catch (error) {
          // Log failed email
          await EmailLog.create({
            recipient: recipient._id,
            status: "failed",
            error: error.message,
            sentAt: new Date(),
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
