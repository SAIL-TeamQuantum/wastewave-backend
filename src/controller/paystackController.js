const Paystack = require('../utils/payment')

class PaystackController {
    createPayment = async (req, res) => {
        try {
            const { amount, email, callbackUrl, metadata } = req.body;

            const paymentDetails = {
                amount,
                email,
                callbackUrl,
                metadata,
            };

            const data = await Paystack.createPayment(paymentDetails);
            const authorizationUrl = data.data.authorization_url
            res.json({authorizationUrl,})
            // return res.status(201).json({
            //     message: "Payment created successfully",
            //     data,
            // });
            
        } catch (error) {
            return res.status(500).json({
                message: "Failed to create payment",
                error: error.message,
            });
        }
    };

    verifyPayment = async (req, res) => {
        try {
            if (!req.query.reference) {
                return res.status(400).json({
                    message: "Missing transaction reference",
                });
            }

            const { data: { metadata, reference, status } } = await Paystack.verifyPayment(req.query.reference);

            if (status !== "success") {
                return res.status(400).json({
                    message: `Transaction failed with status: ${status}`,
                });
            }

            return res.status(200).json({
                message: "Transaction verified successfully",
                data: { metadata, reference, status },
            });
        } catch (error) {
            return res.status(500).json({
                message: "Failed to verify payment",
                error: error.message,
            });
        }
    };
}

const paystackController = new PaystackController();
module.exports = paystackController;