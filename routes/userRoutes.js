const express = require('express');
const { registerUser, authUser, findUser, updateUser, changePassword, forgotPassword } = require('../controllers/userController');

const router = express.Router()

// router.route('/otp').post(signUpotp)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/:_id').put(updateUser)
router.route('/:_id').get(findUser)
router.route('/changepassword/:_id').put(changePassword)
router.route('/forgotpassword/:_id').put(forgotPassword)

module.exports = router;