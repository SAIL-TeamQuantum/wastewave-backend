const express = require('express')
const router = express.Router()
const { signUpUser, signInUser, updateUser, getAllUser, getUserById} = require('../controller/userController')

router.route('/signup').post(signUpUser)
router.route('/signin').post(signInUser)
router.route('/users').get(getAllUser)
router.route('/user/:id').get(getUserById)
router.route('/update/user/:id').patch(updateUser)
module.exports = router;