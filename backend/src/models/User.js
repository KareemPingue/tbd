const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ["admin", "marketer", "analyst"], default: "analyst" },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
