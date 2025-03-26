const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  budget: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Campaign", CampaignSchema);
