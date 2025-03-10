const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipient",
    required: true,
  },
  status: {
    type: String,
    enum: ["sent", "failed"],
    required: true,
  },
  error: {
    type: String,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmailLog", emailLogSchema);
