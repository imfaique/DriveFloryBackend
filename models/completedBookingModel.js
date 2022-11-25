const mongoose = require('mongoose')


const CompletedBookingSchema = mongoose.Schema(
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

        Mechanic_Name: {
            type: String,
            required: true,

        },

        Mechanic_Number: {
            type: String,
            required: true,

        },

        Mechanic_Address: {
            type: String,

        },

        Mechanic_Speciality: {
            type: String,
        },

        Mechanic_Type: {
            type: String,

        },

        Status: {
            type: String
        },

    },

    {
        timestamps: true
    }
)



const CompletedBooking = mongoose.model('CompletedBooking', CompletedBookingSchema)

module.exports = CompletedBooking