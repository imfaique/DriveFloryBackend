const asyncHandler = require('express-async-handler')
const TowingVan = require('../models/towingVanModel')
const generateToken = require('../utils/generateToken')

const AddTowingVan = asyncHandler(async (req, res) => {

    const { name, contactNo, rating } = req.body

    const TowingVanExist = await TowingVan.findOne({ contactNo })

    if (TowingVanExist) {
        res.status(400)
        throw new Error(' Towing Van Already Exists')
    }

    const towingvan = await TowingVan.create({
        name,
        contactNo,
        rating,
    })

    if (towingvan) {
        res.status(201).json({
            _id: towingvan._id,
            name: towingvan.name,
            contactNo: towingvan.contactNo,
            rating: towingvan.rating,
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const getTowingVan = asyncHandler(async (req, res) => {
    const towingvan = await TowingVan.find({}).sort({ rating: -1 })
    return res.json(towingvan)
})

module.exports = { AddTowingVan, getTowingVan }