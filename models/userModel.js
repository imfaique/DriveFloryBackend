const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { roles } = require('../config/roles')

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true

        },

        lastname: {
            type: String,
            required: true

        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        contact: {
            type: String,
            required: true,
            unique: true

        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: roles,
            default: 'user'
        },

        resetLink: {
            data: String,
            default: ''
        },

        isVerified: {
            type: Boolean
        }
    },

    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User