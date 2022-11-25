const asyncHandler = require('express-async-handler')
const Ratingg = require('../models/ratingModel')
// const generateToken = require('../utils/generateToken')

const Ratings = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { User_Name, User_Number, Mechanic_Name, Mechanic_Number, Rating } = req.body

    const rating = await Ratingg.create({
        User_Name,
        User_Number,
        Mechanic_Name,
        Mechanic_Number,
        Rating
    })

    if (rating) {
        res.status(200).send(rating)
    } else {
        res.status(500).send("Problem Rating")
    }
})

const getRating = asyncHandler(async (req, res) => {
    Ratingg.find({}, function (err, rating) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(rating))
    })
})


module.exports = { Ratings, getRating }
