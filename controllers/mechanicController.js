const asyncHandler = require('express-async-handler')
const Driver = require('../models/mechanicModel')
const generateToken = require('../utils/generateToken')

const registerDriver = asyncHandler(async (req, res) => {

    const { name, cnicNo, contactNo, address, username, email, password } = req.body

    const driverExists = await Driver.findOne({ cnicNo })

    if (driverExists) {
        res.status(400)
        throw new Error('Driver Already Exists')
    }

    const driver = await Driver.create({
        name,
        cnicNo,
        contactNo,
        address,
        username,
        email,
        password,
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
            

        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const authMechanic = asyncHandler(async (req, res) => {

    const { username, password } = req.body
    console.log("Driver")
    console.log(username, password)

    const mechanic = await Driver.findOne({ username })

    if (mechanic && (await mechanic.matchPassword(password))) {
        res.json({
            name: mechanic.name,
            email: mechanic.email,
            contactNo: mechanic.contactNo,
            address: mechanic.address,
            mechanicType: mechanic.mechanicType,
            speciality: mechanic.speciality,
            token: generateToken(mechanic._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid UserName or Password')
    }
})

// const getCarTuningMechanic = asyncHandler(async (req, res) => {
//     Driver.find({ mechanicType: 'Car', speciality: 'Tuning' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Driver.");
//         res.status(200).send(mechanics);
//     })
// })

// const getCarAxleMechanic = asyncHandler(async (req, res) => {
//     Driver.find({ mechanicType: 'Car', speciality: 'Axle' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Driver.");
//         res.status(200).send(mechanics);
//     })
// })

// const getCarACMechanic = asyncHandler(async (req, res) => {
//     Driver.find({ mechanicType: 'Car', speciality: 'A/C' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Driver.");
//         res.status(200).send(mechanics);
//     })
// })

// const getBikeMechanic = asyncHandler(async (req, res) => {
//     Driver.find({ mechanicType: 'Bike' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Driver.");
//         res.status(200).send(mechanics);
//     })
// })

const getCarTuningMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Driver.find({ mechanicType: 'Car', speciality: 'Tuning' }).sort({ rating: -1 })
    return res.json(mechanic)
})

const getCarAxleMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Driver.find({ mechanicType: 'Car', speciality: 'Axle' }).sort({ rating: -1 })
    return res.json(mechanic)
})


const getCarACMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Driver.find({ mechanicType: 'Car', speciality: 'AC' }).sort({ rating: -1 })
    return res.json(mechanic)
})


const getBikeMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Driver.find({ mechanicType: 'Bike' }).sort({ rating: -1 })
    return res.json(mechanic)


})

const getRating = asyncHandler(async (req, res) => {

    Driver.ratings = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
    Driver.findByIdAndUpdate(id, { $inc: req.body })
    Driver.findByIdAndUpdate(req.body, { ratings: { 1: 3, 2: 1, 3: 1, 4: 1, 5: 1 } }, { new: true })
    get: {
        let items = Object.entries(req.body);
        let sum = 0;
        let total = 0;
        for (let [key, value] of items) {
            total += value;
            sum += value * parseInt(key);
        }
        return Math.round(sum / total)
    }
})

const setRating = asyncHandler(async (req, res) => {
    Driver.ratings = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
    Driver.findByIdAndUpdate(id, { $inc: req.body })
    Driver.findByIdAndUpdate(req.body, { ratings: { 1: 3, 2: 1, 3: 1, 4: 1, 5: 1 } }, { new: true })

    set: {
        if (!(this instanceof mongoose.Document)) {
            // only call setter when updating the whole path with an object
            if (r instanceof Object) return r
            else { throw new Error('') }
        } else {
            // get the actual ratings object without using the getter which returns  an integer value
            // r is the ratings which is an integer value that represent the star level from 1 to 5
            if (r instanceof Object) {
                return r    // handle setting default when creating object
            }
            this.get('ratings', null, { getters: false })[r] = 1 + parseInt(this.get('ratings', null, { getters: false })[r])
            return this.get('ratings', null, { getters: false })
        } // return the updated ratings object
    }
})




module.exports = { registerDriver, authMechanic, getCarTuningMechanic, getCarAxleMechanic, getCarACMechanic, getBikeMechanic, setRating, getRating }