const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const carRegistrationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        cnicNo: {
            type: String,
            required: true,
            unique: true
        },

        contactNo: {
            type: String,
            required: true,
            unique: true
        },

        address: {
            type: String,
            required: true,
            index: true,
        },

        vehicleType: {
            type: String,
            required: true,

        },

        companyName: {
            type: String,
            required: true,
        },

        model: {
            type: String,
            required: true,

        },

        registrationNo: {
            type: String,
            required: true,
            unique: true,
        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        password: {
            type: String,
            required: true
        },


        images: {
            type: Array,
        },

        rent: {
            type: Number,
            required: true
        },

        modelYear: {
            type: String,
            required: true
        }


    },

    {
        timestamps: true
    }
)

carRegistrationSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

carRegistrationSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const CarRegistration = mongoose.model('CarRegistration', carRegistrationSchema)

module.exports = CarRegistration