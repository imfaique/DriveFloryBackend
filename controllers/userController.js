const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv');
const User = require('../models/userModel')
// const userVerification = require('../models/userVerification')
const generateToken = require('../utils/generateToken')
// const nodemailer = require('nodemailer')
// const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose');
// require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


// let transpoter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASS
//     }

// })

// transpoter.verify((error, success) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log('ready for messages')
//         console.log(success)
//     }
// })


// const mailgun = require("mailgun-js");

// dotenv.config()
// const DOMAIN = 'sandbox78f59396ca4e4eb9ba91d5fb3e0b92be.mailgun.org';
// const APIKEY = process.env.MAILGUN_APIKEY
// // console.log(APIKEY);
// const mg = mailgun({ apiKey: APIKEY, domain: DOMAIN });




const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, contact, username, password } = req.body
    console.log(req.body);

    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(400).send("User Already Exist.")
    }

    const user = await User.create({
        firstname,
        lastname,
        email,
        contact,
        username,
        password,
        emailToken: crypto.getRandomBytes(64).toString
    })

    if (user) {

        res.status(200).send(user)
    } else {
        res.status(500).send("Problem Signing Up!")
    }

})

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    const user = await User.findOne({ username })

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            name: user.firstname + ' ' + user.lastname,
            contact: user.contact,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Username or Password')
    }
})

const findUser = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    User.findOne({ "_id": req.params._id }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the User.");
        res.status(200).send(JSON.stringify(user));
    })
})

const updateUser = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!user) {
        return res.status(500).send("There's a problem Updating User")
    }
    res.status(200).send(JSON.stringify(user));
})

const changePassword = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    const { currentPassword, password } = req.body;
    // Encrypting Update Password
    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log(currentPassword, password, req.body.password);

    const user = await User.findOne({ "_id": req.params._id })
    console.log("User Found");
    console.log(user);

    if (user && (await user.matchPassword(currentPassword))) {
        console.log("Password Matched");

        const user = await User.findByIdAndUpdate(req.params._id, { password: req.body.password }, { new: true });
        if (!user) {
            return res.status(500).send("There's a problem Reseting Password")
        }
        res.status(200).send(user);

    }

})

// const emailtoken= jwt.sign({
//     username: req.body.username    
// },'secret1234',{expiresIn: '1h'})
// ElementInternals.verifyUserEmail(req.body.id,req.body.email,req.body.username, emailtoken)
// User.save()
// .then(data=>{
//     res.json(data)
// })
// .catch(error=>{
//     res.json(error)
// })

const forgotPassword = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    if (req.params._id === '') {
        res.status(500).send('Provide Your Email')
    } else {
        const { currentPassword, password } = req.body;
        // Encrypting Update Password
        req.body.password = await bcrypt.hash(req.body.password, 10)
        console.log(req.params._id, password, req.body.password);

        const user = await User.findOne({ "email": req.params._id })


        if (user) {
            console.log(user._id);
            const updateUser = await User.findByIdAndUpdate(user._id, { password: req.body.password }, { new: true });
            if (!user) {
                return res.status(500).send("Not Valid Email")
            }
            res.status(200).send(updateUser);
        }
    }






})


module.exports = { registerUser, authUser, findUser, updateUser, changePassword, forgotPassword }