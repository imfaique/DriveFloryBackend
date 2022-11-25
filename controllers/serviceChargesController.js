const asyncHandler = require('express-async-handler')
const ServiceCharges = require('../models/serviceChargesModel')
const generateToken = require('../utils/generateToken')

// Adding Service Charges Function
const AddServiceCharges = asyncHandler(async (req, res) => {

    const { Service, Charges, Mechanic_Type } = req.body

    const serviceCharges = await ServiceCharges.create({
        Service,
        Charges,
        Mechanic_Type
    })
    console.log(Service + "-" + Charges)

    if (serviceCharges) {
        res.status(201).json({
            _id: serviceCharges._id,
            service: serviceCharges.Service,
            charges: serviceCharges.Charges,
            mechani_type: serviceCharges.Mechanic_Type,
            token: generateToken(serviceCharges._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})


// Getting Price of Selected Services 


const findServiceCharges = asyncHandler(async (req, res) => {
    console.log(req.params._id)
    ServiceCharges.find({ "Mechanic_Type": req.params._id }, function (err, serviceCharges) {
        if (err) return res.status(500).send("Failed Fetching Data")
        console.log(serviceCharges)
        res.status(200).send(JSON.stringify(serviceCharges))
    })
})

const getCarTuningServiceCharges = asyncHandler(async (req, res) => {
    const mechanicServiceCharges = await ServiceCharges.find({ Mechanic_Type: 'Tuning' })
    return res.json(mechanicServiceCharges)
})


const getCarAxleServiceCharges = asyncHandler(async (req, res) => {
    const mechanicServiceCharges = await ServiceCharges.find({ Mechanic_Type: 'Axle' })
    return res.json(mechanicServiceCharges)
})


const getCarACServiceCharges = asyncHandler(async (req, res) => {
    const mechanicServiceCharges = await ServiceCharges.find({ Mechanic_Type: 'A/C' })
    return res.json(mechanicServiceCharges)
})



module.exports = {
    AddServiceCharges,
    findServiceCharges,
    getCarTuningServiceCharges,
    getCarAxleServiceCharges,
    getCarACServiceCharges
}