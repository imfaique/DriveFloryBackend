const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const generateToken = require('../utils/generateToken')

const registerAdmin = asyncHandler(async (req, res) => {

    const { name, username, password } = req.body

    const admin = await Admin.create({
        name,
        username,
        password
    })

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const authAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
console.log(req.body)
    const admin = await Admin.findOne({ username })

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            name: admin.name,
            role: admin.role,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
})


module.exports = { registerAdmin, authAdmin }