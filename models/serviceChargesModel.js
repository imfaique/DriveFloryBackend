const mongoose = require('mongoose')


const ServiceChargesSchema = mongoose.Schema(
    {
        Service: {
            type: String
        },

        Charges: {
            type: Number
        },

        Mechanic_Type: {
            type: String
        }

    },


)



const ServiceCharges = mongoose.model('ServiceCharges', ServiceChargesSchema)

module.exports = ServiceCharges