const mongoose = require('mongoose')


const BookingSchema = mongoose.Schema(
    {
        User_Name: {
            type: String,
            required: true

        },

        User_Number: {
            type: String,
            required: true

        },

        User_Email: {
            type: String,
            required: true,

        },

        User_Address: {
            type: String,
            required: true,

        },
        Owner_Name: {
            type: String,
            required: true,

        },
        Owner_No: {
            type: String,
            required: true,

        },
        Registration_No: {
            type: String,
            required: true,

        },

        Car_Company: {
            type: String,
            required: true,


        },

        Model: {
            type: String,
            required: true,

        },

        Model_Year: {
            type: String,
            required: true,

        },
        Rent: {
            type: String,
            required: true,

        },

        // Booking_Date: {
        //     type: String,
        //     required: true,
        // },

        Requested_Date: {
            type: String,
            required: true,
        },

        // Type: {
        //     type: String
        // },

        // Status: {
        //     type: String
        // }

    },

    {
        timestamps: true
    }
)



const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking