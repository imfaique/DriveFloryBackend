const asyncHandler = require('express-async-handler')
const driverRegistration = require('../models/driverModel')
const generateToken = require('../utils/generateToken')





const registerDriver = asyncHandler(async (req, res) => {

    console.log(req.body);
    const { name, cnicNo, contactNo, address, username, email, password, } = req.body

    console.log({
        name,
        cnicNo,
        contactNo,
        address,
        username,
        email,
        password,

    });

    const driverExists = await driverRegistration.findOne({ cnicNo })

    if (driverExists) {
        res.status(400)
        throw new Error('Driver Already Exists')
    }

    const driver = await driverRegistration.create({
        name,
        cnicNo,
        contactNo,
        address,
        username,
        email,
        password,
    })

    console.log(driver);

    if (driver) {
        res.status(201).json({
            _id: driver._id,
            name: driver.name,
            cnicNo: driver.cnicNo,
            username: driver.username,
            email: driver.email,
            contactNo: driver.contactNo,
            address: driver.address,
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

module.exports = { registerDriver }