const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const mechanicSchema = mongoose.Schema(
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

        mechanicType: {
            type: String,
            required: true,

        },

        speciality: {
            type: String,
            required: true,
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

        rating: {
            type: String,
            index: true,
        }


    },

    {
        timestamps: true
    }
)

mechanicSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

mechanicSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Mechanic = mongoose.model('Mechanic', mechanicSchema)

module.exports = Mechanic