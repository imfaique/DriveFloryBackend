const asyncHandler = require('express-async-handler')
const Complains = require('../models/complainModel')

const launchComplain = asyncHandler(async (req, res) => {

    const { UserName, UserEmail, Subject, Complain } = req.body

    const complain = await Complains.create({
        UserName,
        UserEmail,
        Subject,
        Complain
    })

    if (complain) {
        res.status(200).send(JSON.stringify(complain))
    } else {
        res.status(500).send("Problem Launching Your Complain")
    }
})

const getComplains = asyncHandler(async (req, res) => {
    const complain = await Complains.find({})
    return res.json(complain)
})


module.exports = { launchComplain, getComplains }