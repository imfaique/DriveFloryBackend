const asyncHandler = require('express-async-handler')
const MechanicRating = require('../models/mechanicModel')
const generateToken = require('../utils/generateToken')

const ratingMechanic = asyncHandler(async (req, res) => {
    consle.log(req.params._id)
    const { Mechanic_Name, Mechanic_ID, Customer_Name, rating } = req.body

    const mechanicExists = await MechanicRating.findOne(req.params._id)

    if (mechanicExists) {
        const mechanic = await MechanicRating.update({
            $push: {
                Reviews: {
                    Review_ID: 2,
                    Customer_Name: Customer_Name,
                    rating: rating
                }
            }
        })
    }

    const mechanic = await MechanicRating.create({
        Mechanic_Name,
        Mechanic_ID,
        Customer_Name,
        rating,

    })

    if (mechanic) {
        res.status(201).json({
            _id: mechanic._id,
            name: mechanic.name,
            cnicNo: mechanic.cnicNo,
            username: mechanic.username,
            email: mechanic.email,
            contactNo: mechanic.contactNo,
            address: mechanic.address,
            mechanicType: mechanic.mechanicType,
            speciality: mechanic.speciality,

        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})
module.exports = { ratingMechanic }