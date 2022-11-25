const asyncHandler = require('express-async-handler')
const CompletedBooking = require('../models/completedBookingModel')
const generateToken = require('../utils/generateToken')


const CompletedBookings = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { User_Name, User_Number, User_Email, Car_Company, Model, Model_Year, Mechanic_Name, Mechanic_Number, Mechanic_Address, Mechanic_Speciality, Mechanic_Type, Status } = req.body

    const completedbooking = await CompletedBooking.create({
        User_Name,
        User_Number,
        User_Email,
        Car_Company,
        Model,
        Model_Year,
        Mechanic_Name,
        Mechanic_Number,
        Mechanic_Address,
        Mechanic_Speciality,
        Mechanic_Type,
        Status,

    }, function (err, completedbooking) {
        if (err) return res.status(500).send("There was a problem in Completing Booking.");
        res.status(200).send(completedbooking);
    })
})


const getCompleteBooking = asyncHandler(async (req, res) => {
    const completedbooking = await CompletedBooking.find({
        "User_Number": req.params._id
    })
    return res.json(completedbooking)
})

const DeleteCompletedBooking = asyncHandler(async (req, res) => {
    // console.log(req.params._id);
    var id = req.params._id
    console.log(id)
    const b = await CompletedBooking.deleteOne({ id })
    console.log(b)
    if (err) {
        res.status(500).send("There was a problem Deleteing Booking")
    } else {
        res.status(200).send(b)

    }

})

// const findBookingByTomorrowDate = asyncHandler(async (req, res) => {
//     const d = new Date()
//     const dateTomorrow = (d.getDate() + 1) + '-' + '0' + (d.getMonth() + 1) + '-' + d.getFullYear()
//     const confirmedbooking = await ConfirmedBooking.find({ "Mechanic_Number": req.params._id, 'Requested_Date': dateTomorrow })
//     return res.json(confirmedbooking)
// })

// const UpdateBooking = asyncHandler(async (req, res) => {
//     console.log(req.params._id)
//     console.log(req.body)
//     const confirmedbooking = await ConfirmedBooking.findByIdAndUpdate(req.params._id, req.body, { new: true });
//     if (!confirmedbooking) {
//         return res.status(500).send("No Booking Found")
//     }
//     res.status(200).send(JSON.stringify(confirmedbooking));
// })


// const findUserCompleteService = asyncHandler(async (req, res) => {
//     console.log(req.params._id)
//     const completebooking = await ConfirmedBooking.find({ "User_Number": req.params._id, "Status": "Completed" })
//     return res.json(completebooking)
// })

module.exports = { CompletedBookings, getCompleteBooking, DeleteCompletedBooking }
