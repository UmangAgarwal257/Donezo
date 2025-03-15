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

// Import models and templates
const Recipient = require("./models/recipient");
const EmailLog = require("./models/emailLog");

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

// Schedule weekly emails (Every Monday at 9 AM UTC)
cron.schedule('0 9 * * 1', async () => {
  console.log('Running weekly email job...');
  try {
    const activeRecipients = await Recipient.find({ active: true });
    
    for (const recipient of activeRecipients) {
      // Determine if we need to send a reminder
      const lastEmailDate = recipient.lastEmailedAt;
      const type = !lastEmailDate || 
                   (new Date() - lastEmailDate) > 7 * 24 * 60 * 60 * 1000 
                   ? 'weeklyCheck' 
                   : 'reminder';

      await sendEmailAndLog(recipient, emailTemplates[recipient.style || 'elonMusk'], recipient.style || 'elonMusk', type);
      
      // Add delay between emails to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('Weekly email job completed');
  } catch (error) {
    console.error('Error in weekly email job:', error);
  }
});

// Registration endpoint (no immediate email)
app.post("/api/test/send-email", async (req, res) => {
  try {
    const { style = 'elonMusk', recipient } = req.body;
    
    if (!recipient || !recipient.email) {
      return res.status(400).json({ message: "Recipient email is required" });
    }

    // Create or update recipient
    let recipientDoc = await Recipient.findOne({ email: recipient.email });
    if (!recipientDoc) {
      recipientDoc = await Recipient.create({
        email: recipient.email,
        name: recipient.name || '',
        style: style, // Save the preferred style
        active: true
      });
    } else {
      // Update existing recipient's style preference
      recipientDoc.style = style;
      await recipientDoc.save();
    }

    // Calculate next Monday at 9 AM UTC
    const now = new Date();
    const daysUntilMonday = (8 - now.getUTCDay()) % 7; // If today is Monday, wait for next Monday
    const nextMonday = new Date(now);
    nextMonday.setUTCDate(now.getUTCDate() + daysUntilMonday);
    nextMonday.setUTCHours(9, 0, 0, 0);

    res.json({ 
      message: "Successfully registered for weekly reviews",
      nextEmailDate: nextMonday.toISOString(),
      recipient: {
        email: recipientDoc.email,
        name: recipientDoc.name,
        style: recipientDoc.style
      }
    });
  } catch (error) {
    console.error("Error in registration endpoint:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Routes
app.use("/api/recipients", recipientRoutes);
app.use("/api/logs", emailLogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Weekly email job scheduled for Mondays at 9 AM UTC');
});
