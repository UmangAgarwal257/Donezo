const express = require("express");
const router = express.Router();
const EmailLog = require("../models/emailLog");

// Get all email logs
router.get("/", async (req, res) => {
  try {
    const logs = await EmailLog.find()
      .populate("recipient", "email name")
      .sort({ sentAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get logs for a specific recipient
router.get("/recipient/:recipientId", async (req, res) => {
  try {
    const logs = await EmailLog.find({ recipient: req.params.recipientId })
      .populate("recipient", "email name")
      .sort({ sentAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
