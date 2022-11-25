const mongoose = require('mongoose')

const ComplainSchema = mongoose.Schema(
    {
        UserName: {
            type: String,
            required: true

        },

        UserEmail: {
            type: String,
            required: true,

        },

        Subject:{
            type:String,
            required:true,
        },

        Complain: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
)

const Complain = mongoose.model('Complain', ComplainSchema)

module.exports = Complain