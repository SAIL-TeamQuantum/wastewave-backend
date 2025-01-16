const mongoose = require('mongoose');

const UserOTPVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref:'user'},
  email: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date
});

const UserOTPVerification = mongoose.model("UserOTPVerification", UserOTPVerificationSchema);

module.exports = UserOTPVerification;