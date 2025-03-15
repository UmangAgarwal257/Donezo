const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  style: {
    type: String,
    enum: ['elonMusk', 'steveJobs'],
    default: 'elonMusk'
  },
  timezone: {
    type: String,
    required: true,
    default: 'UTC'
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastEmailedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Recipient", recipientSchema);
