const express = require("express");
const router = express.Router();
const Recipient = require("../models/recipient");

// Get all recipients
router.get("/", async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new recipient
router.post("/", async (req, res) => {
  const recipient = new Recipient({
    email: req.body.email,
    name: req.body.name,
  });

  try {
    const newRecipient = await recipient.save();
    res.status(201).json(newRecipient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update recipient
router.patch("/:id", async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (req.body.email) recipient.email = req.body.email;
    if (req.body.name) recipient.name = req.body.name;
    if (req.body.active !== undefined) recipient.active = req.body.active;

    const updatedRecipient = await recipient.save();
    res.json(updatedRecipient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete recipient
router.delete("/:id", async (req, res) => {
  try {
    const result = await Recipient.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    res.json({ message: "Recipient deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
