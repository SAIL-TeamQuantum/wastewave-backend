const express = require("express");
const router = express.Router();

const protect = require("../middleware/gaurd");
const paystackController = require("../controller/paystackController");


router.route("/paystack/initialize").post(paystackController.createPayment);
router.route("/paystack/verify").get(paystackController.verifyPayment);

module.exports = router;