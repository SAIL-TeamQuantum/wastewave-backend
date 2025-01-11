const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUpUser = async(req,res)=> {
    try {
        const {email, password} = req.body
        const salt = await bcrypt.genSalt(9)
        const hash = await bcrypt.hash(password, salt)

        const user = await userModel.findOne({email})
        if (user) {
            res.status(400).json({
                message: "User already exist"
            }) 
        }
        else {
        const new_user = await userModel.create({
            email,
            password: hash
        })
        res.status(201).json({
            message: 'user successfully created',
            data: new_user
        })
    }
    }
    catch (error) {
        res.status(400).json({
            message: 'failed to create user',
            data: error.message
        })
    }
}


const signInUser = async(req,res)=> {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({email})

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword) {
                const token = await jwt.sign({_id: user._id}, "qwertyuiop", {expiresIn: "5d"})
                const { password, ...info} = user._doc;

                res.status(201).json({
                    message: "User signed in",
                    data: { token, ...info }
                })
            }
            else {
                res.status(400).json({
                    message: "Incorrect password"
                })         
            }
        }
        else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Failed to sign user in",
            data: error.message
        })
    }
}
const getAllUser = async (req, res) => {
    try {
      const getUser = await userModel.find();
      res.status(200).json({
        message: "User gotten Sucessfully",
        data: getUser,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to get User",
        data: error.message,
      });
    }
  };
const getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await userModel.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};
const updateUser = async(req, res) => {
    try {
    const id = req.params.id
    const userExist = await userModel.findById(id);
    if (!userExist) {
    return res.status(404).json({ message: "User not found." });
    }
    const updatedData = await userModel.findByIdAndUpdate(id, req.body, { 
    new: true})
        
    res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message})
    }
}
module.exports = {signUpUser, signInUser, updateUser, getAllUser, getUserById }