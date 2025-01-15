const express = require("express");
const router = express.Router();
const { sendOTPVerificationEmail, resendOTP, verifyOTP } = require('../controller/otpController')
const protect = require("../middleware/gaurd");

router.route("/verifyotp").post(verifyOTP);
router.route("/resendotp").post(resendOTP);

module.exports = router;