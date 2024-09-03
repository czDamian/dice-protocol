// models/Users.js

import mongoose from "mongoose";

// Updated user schema with additional fields
const userSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true, unique: true },
    ip: { type: String, default: null }, 
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    device: { type: String, default: "Desktop" },
    referer: { type: String, default: "Direct" },
  },
  { timestamps: true }
);

delete mongoose.models.User;

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
