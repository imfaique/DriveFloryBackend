const mongoose = require('mongoose')

const towingVanSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        contactNo: {
            type: String,
            required: true,
            unique: true
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

const TowingVan = mongoose.model('TowingVan', towingVanSchema)

module.exports = TowingVan