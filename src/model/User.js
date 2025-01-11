const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        },
        name: { type: String }, // Optional field
        address: { type: String }, // Optional field
    }, {timestamps: true}
)

const userModel = mongoose.model("user", userSchema)
module.exports = userModel