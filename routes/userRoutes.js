const express = require('express');
const mongoose = require('mongoose');
const user = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { registerUser, authUser, findUser, updateUser, changePassword, forgotPassword } = require('../controllers/userController');
const nodemon = require('nodemon');

const router = express.Router()

// router.route('/otp').post(signUpotp)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/:_id').put(updateUser)
router.route('/:_id').get(findUser)
router.route('/changepassword/:_id').put(changePassword)
router.route('/forgotpassword/:_id').put(forgotPassword)

module.exports = router;