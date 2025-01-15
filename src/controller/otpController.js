const UserOTPVerification = require('../model/UserOTPVerification')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const userModel = require('../model/User')

//Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "wastewave2025@gmail.com",
        pass: process.env.AUTH_PASS
    }
});
//testing Nodemailer
transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});
// sent OTP verification email
const sendOTPVerificationEmail = async ({_id, email}, res) => {
    try {
        const otp = `${Math.floor(100000 + Math.random() * 90000)}`

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your sign up</p><p>This code expires in 10 minutes</p>`
        }

        const saltRounds = 10

        const hashedOTP = await bcrypt.hash(otp, saltRounds)
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 10 * 60 * 1000
        });
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions)
        // res.json({
        //     status: "PENDING",
        //     message: "Verification otp email sent",
        //     data: {
        //         userId: _id,
        //         email,
        //     }
        // })
        return { status: "PENDING", message: "Verification OTP email sent" };
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        })
    }
}

//Verify OTP
const verifyOTP = async(req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            throw Error("Empty OTP details are not allowed")
        } else {
            const userOTPVerificationRecords = await UserOTPVerification.find({
                userId
            })
            if (userOTPVerificationRecords.length == 0) {
                throw new Error("Account record doesn't exist or has been verified already. Please sign up or sign in")
            } else {
                const { expiresAt } = userOTPVerificationRecords[0];
                const hashedOTP = userOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    await UserOTPVerification.deleteMany({ userId })
                    throw new Error("Code has expired. Please request again.")
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP)

                    if (!validOTP) {
                        throw new Error("Invalid code passed. Check your inbox.")
                    } else {
                        await userModel.updateOne({_id: userId}, {verified: true})
                        UserOTPVerification.deleteMany({ userId})
                        res.json({
                            status: "VERIFIED",
                            message: "User email verified successfully"
                        })
                        
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        })
    }
}

//resend OTP 
const resendOTP = async(req, res)=> {
    try {
        let { userId, email } = req.body

        if (!userId || !email) {
            throw Error("Empty user details are not allowed")
        }
        else {
            await UserOTPVerification.deleteMany({ userId })
            sendOTPVerificationEmail({ _id: userId, email }, res)
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        })
    }
}

module.exports = { sendOTPVerificationEmail, resendOTP, verifyOTP }