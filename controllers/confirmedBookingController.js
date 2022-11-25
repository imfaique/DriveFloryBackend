const asyncHandler = require('express-async-handler')
const ConfirmedBooking = require('../models/confirmedBookingModel')
const generateToken = require('../utils/generateToken')

const d = new Date()
const dateToday = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
const dateTomorrow = (d.getDate() + 1) + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()


const ConfirmedBookings = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { User_Name, User_Number, User_Email, Car_Company, Model, Model_Year, Mechanic_Name, Mechanic_Number, Mechanic_Address, Mechanic_Speciality, Mechanic_Type, Booking_Date, Requested_Date, Type, Status, Time_Of_Service } = req.body

    const confirmedbooking = await ConfirmedBooking.create({
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
        Booking_Date,
        Requested_Date,
        Type,
        Status,
        Time_Of_Service

    }, function (err, confirmedbooking) {
        if (err) return res.status(500).send("There was a problem in Confirming Booking.");
        res.status(200).send(confirmedbooking);
    })
})

const findConfirmedBooking = asyncHandler(async (req, res) => {
    ConfirmedBooking.find({}, function (err, confirmedbooking) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(confirmedbooking))
    })
})

const findBookingByTodayDate = asyncHandler(async (req, res) => {
    // const c = "Confirmed"
    console.log(dateToday)
    const confirmedbooking = await ConfirmedBooking.find({
        "Mechanic_Number": req.params._id, "Requested_Date": dateToday
    })
    return res.json(confirmedbooking)
})

const findBookingByTomorrowDate = asyncHandler(async (req, res) => {
    // const d = new Date()
    const confirmedbooking = await ConfirmedBooking.find({ "Mechanic_Number": req.params._id, 'Requested_Date': dateTomorrow })
    return res.json(confirmedbooking)
})

const UpdateBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id)
    console.log(req.body)
    const confirmedbooking = await ConfirmedBooking.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!confirmedbooking) {
        return res.status(500).send("No Booking Found")
    }
    res.status(200).send(JSON.stringify(confirmedbooking));
})

const DeleteConfirmedBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    ConfirmedBooking.findByIdAndRemove(req.params._id, function (err, confirmedbooking) {
        if (err) return res.status(500).send("There was a problem Deleteing Booking")
        res.status(200).send(JSON.stringify(confirmedbooking))
    })
})


const findUserCompleteService = asyncHandler(async (req, res) => {
    console.log(req.params._id)
    const completebooking = await ConfirmedBooking.find({ "User_Number": req.params._id, "Status": "Completed" })
    return res.json(completebooking)
})

module.exports = { ConfirmedBookings, findConfirmedBooking, findBookingByTodayDate, findBookingByTomorrowDate, UpdateBooking, DeleteConfirmedBooking, findUserCompleteService }
