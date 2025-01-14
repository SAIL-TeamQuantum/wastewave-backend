const axios = require('axios')

class Paystack {
    static async createPayment(payload) {
        const response = await axios.post(
            `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
            payload,
            {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            }
        );
        return response.data;
    }
    static async verifyPayment(reference) {
        const response = await axios.get(
            `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
            {
                headers: {
                  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                  "Content-Type": "application/json",
                },
            }
        )
        return response.data
    }
  }

module.exports = Paystack

