const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const driverRegistrationSchema = mongoose.Schema(
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


    },

    {
        timestamps: true
    }
)

driverRegistrationSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

driverRegistrationSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const driverRegistration = mongoose.model('driverRegistration', driverRegistrationSchema)

module.exports = driverRegistration