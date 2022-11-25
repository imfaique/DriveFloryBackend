const mongoose = require('mongoose')


const RatingSchema = mongoose.Schema(
    {
        User_Name: {
            type: String,
            required: true

        },

        User_Number: {
            type: String,
            required: true

        },


        Mechanic_Name: {
            type: String,
            required: true,

        },

        Mechanic_Number: {
            type: String,
            required: true,

        },

        Rating: {
            type: Number,
        }





    },

    {
        timestamps: true
    }
)



const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating