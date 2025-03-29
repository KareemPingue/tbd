const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);
module.exports = PasswordResetToken;
