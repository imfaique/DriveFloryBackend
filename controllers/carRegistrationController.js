const { application } = require('express');
const asyncHandler = require('express-async-handler')
const CarRegistration = require('../models/carRegistrationModel')
const generateToken = require('../utils/generateToken')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dej429te5',
    api_key: '247639657615337',
    api_secret: '8LgeIJ4d5RRcSj53GEUMiUTJd68',
    secure: true
});



const registerCar = asyncHandler(async (req, res) => {

    // app.post("/uploadImage", (req, res) => {
    //     uploadImage(req.body.image)
    //         .then((url) => res.send(url))
    //         .catch((err) => res.status(500).send(err));


    // });

    // app.post("/uploadMultipleImages", (req, res) => {
    //     uploadMultipleImages(req.body.images)
    //         .then((urls) => res.send(urls))
    //         .catch((err) => res.status(500).send(err));


    // });

    console.log(req.body);

    // const file = req.files.image;
    // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //     console.log(result);
    // })
    const { name, cnicNo, contactNo, address, vehicleType, companyName, model, registrationNo, username, email, password, image, rent, modelYear } = req.body

    console.log({
        name,
        cnicNo,
        contactNo,
        address,
        vehicleType,
        companyName,
        model,
        registrationNo,
        username,
        email,
        password,
        image,
        rent,
        modelYear
    });

    const carExists = await CarRegistration.findOne({ registrationNo })

    if (carExists) {
        res.status(400)
        throw new Error('Car Already Exists')
    }

    const car = await CarRegistration.create({
        name,
        cnicNo,
        contactNo,
        address,
        vehicleType,
        companyName,
        model,
        registrationNo,
        username,
        email,
        password,
        image,
        rent,
        modelYear
    })

    console.log(car);

    if (car) {
        res.status(201).json({
            _id: car._id,
            name: car.name,
            cnicNo: car.cnicNo,
            username: car.username,
            email: car.email,
            contactNo: car.contactNo,
            address: car.address,
            vehicleType: car.vehicleType,
            companyName: car.companyName,
            // model: car.model,
            registrationNo: car.registrationNo,
            image: car.image,
            rent: car.rent,
            modelYear: car.modelYear


        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const authCarOwner = asyncHandler(async (req, res) => {

    const { username, password } = req.body
    console.log("Car Owner")
    console.log(username, password)

    const carOwner = await CarRegistration.findOne({ username })

    if (carOwner && (await carOwner.matchPassword(password))) {
        res.json({
            name: carOwner.name,
            email: carOwner.email,
            contactNo: carOwner.contactNo,
            address: carOwner.address,
            token: generateToken(carOwner._id)
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

const getCar = asyncHandler(async (req, res) => {
    const Car = await CarRegistration.find({})
    return res.json(Car)
})

const getHiace = asyncHandler(async (req, res) => {
    const Hiace = await CarRegistration.find({ vehicleType: 'Hiace' })
    return res.json(Hiace)
})


const getCoaster = asyncHandler(async (req, res) => {
    const Coaster = await CarRegistration.find({ vehicleType: 'Coaster' }).sort({ rating: -1 })
    return res.json(Coaster)
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






module.exports = { registerCar, authCarOwner, getCar, getHiace, getCoaster }