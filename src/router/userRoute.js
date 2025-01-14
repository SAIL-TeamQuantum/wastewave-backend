const express = require("express");
const router = express.Router();
const {
    signUpUser,
    signInUser,
    updateUser,
    getAllUser,
    getUserById,
} = require("../controller/userController");
const protect = require("../middleware/gaurd");
const paystackController = require("../controller/paystackController");

router.route("/register").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/users").get(getAllUser);
router.route("/user/:id").get(getUserById);
router.route("/update/user/:id").patch(protect, updateUser);
router.route("/paystack/initialize").post(paystackController.createPayment);
router.route("/paystack/verify").get(paystackController.verifyPayment);

module.exports = router;
