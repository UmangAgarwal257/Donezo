const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    template: {
      style: {
        type: String,
        enum: ["elonMusk", "steveJobs"],
        required: true,
      },
      type: {
        type: String,
        enum: ["weeklyCheck", "reminder"],
        required: true,
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmailLog", emailLogSchema);
