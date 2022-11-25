const asyncHandler = require('express-async-handler')
const Bill = require('../models/billModal')
const generateToken = require('../utils/generateToken')


const GenerateBill = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {
        User_Name,
        User_Number,
        Car_Name,
        Car_Owner_Number,
        Total_Amount
    } = req.body

    const bill = await Bill.create({
        User_Name,
        User_Number,
        Car_Name,
        Car_Owner_Number,
        Total_Amount

    }, function (err, bill) {
        if (err) return res.status(500).send("There was a problem in Generating Bill.");
        res.status(200).send(bill);
    })

})

const findBill = asyncHandler(async (req, res) => {
    Bill.find({}, function (err, bill) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(bill))
    })
})


module.exports = { GenerateBill, findBill }
