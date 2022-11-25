const asyncHandler = require('express-async-handler')
const Mechanic = require('../models/mechanicModel')
const generateToken = require('../utils/generateToken')

const registerMechanic = asyncHandler(async (req, res) => {

    const { name, cnicNo, contactNo, address, mechanicType, speciality, username, email, password, rating } = req.body

    const mechanicExists = await Mechanic.findOne({ cnicNo })

    if (mechanicExists) {
        res.status(400)
        throw new Error('Mechanic Already Exists')
    }

    const mechanic = await Mechanic.create({
        name,
        cnicNo,
        contactNo,
        address,
        mechanicType,
        speciality,
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
            mechanicType: mechanic.mechanicType,
            speciality: mechanic.speciality,

        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const authMechanic = asyncHandler(async (req, res) => {

    const { username, password } = req.body
    console.log("Mechanic")
    console.log(username, password)

    const mechanic = await Mechanic.findOne({ username })

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
//     Mechanic.find({ mechanicType: 'Car', speciality: 'Tuning' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Mechanic.");
//         res.status(200).send(mechanics);
//     })
// })

// const getCarAxleMechanic = asyncHandler(async (req, res) => {
//     Mechanic.find({ mechanicType: 'Car', speciality: 'Axle' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Mechanic.");
//         res.status(200).send(mechanics);
//     })
// })

// const getCarACMechanic = asyncHandler(async (req, res) => {
//     Mechanic.find({ mechanicType: 'Car', speciality: 'A/C' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Mechanic.");
//         res.status(200).send(mechanics);
//     })
// })

// const getBikeMechanic = asyncHandler(async (req, res) => {
//     Mechanic.find({ mechanicType: 'Bike' }, function (err, mechanics) {
//         if (err) return res.status(500).send("There was a problem finding the Mechanic.");
//         res.status(200).send(mechanics);
//     })
// })

const getCarTuningMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Mechanic.find({ mechanicType: 'Car', speciality: 'Tuning' }).sort({ rating: -1 })
    return res.json(mechanic)
})

const getCarAxleMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Mechanic.find({ mechanicType: 'Car', speciality: 'Axle' }).sort({ rating: -1 })
    return res.json(mechanic)
})


const getCarACMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Mechanic.find({ mechanicType: 'Car', speciality: 'AC' }).sort({ rating: -1 })
    return res.json(mechanic)
})


const getBikeMechanic = asyncHandler(async (req, res) => {
    const mechanic = await Mechanic.find({ mechanicType: 'Bike' }).sort({ rating: -1 })
    return res.json(mechanic)


})

const getRating = asyncHandler(async (req, res) => {

    Mechanic.ratings = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
    Mechanic.findByIdAndUpdate(id, { $inc: req.body })
    Mechanic.findByIdAndUpdate(req.body, { ratings: { 1: 3, 2: 1, 3: 1, 4: 1, 5: 1 } }, { new: true })
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
    Mechanic.ratings = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
    Mechanic.findByIdAndUpdate(id, { $inc: req.body })
    Mechanic.findByIdAndUpdate(req.body, { ratings: { 1: 3, 2: 1, 3: 1, 4: 1, 5: 1 } }, { new: true })

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




module.exports = { registerMechanic, authMechanic, getCarTuningMechanic, getCarAxleMechanic, getCarACMechanic, getBikeMechanic, setRating, getRating }