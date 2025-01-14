const dotenv = require("dotenv")

dotenv.config({path : __dirname + '/../../.env'})

const config =  {
    paystackSecret: process.env.PAYSTACK_SECRET_KEY,
    paystackURL: process.env.PAYSTACK_BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

export default config