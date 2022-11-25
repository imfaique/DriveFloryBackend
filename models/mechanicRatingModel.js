const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const reviewCount = 0
const review_id = reviewCount + 1

const mechanicRatingSchema = mongoose.Schema(
    {
        Mechanic_Name: {
            type: String,
            required: true
        },

        Mechanic_ID: {
            type: String,
            required: true
        },

        Reviews: [
            {
                Review_ID: {
                    review_id
                },

                Customer_Name: {
                    type: String,
                },

                rating: {
                    type: Number
                }

            },
        ]

    },

    {
        timestamps: true
    }
)



const MechanicRating = mongoose.model('Mechanic', mechanicRatingSchema)

module.exports = MechanicRating