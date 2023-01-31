const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes')
const vehicleRoute = require('./routes/vehicleRoute')
const carRegistrationRoute = require('./routes/carRegistrationRoutes')
const towingVanRoute = require('./routes/towingVanRoutes')
const userRoute = require('./routes/userRoutes')
const bookingRoute = require('./routes/bookingRoutes')
const confirmedBookingRoute = require('./routes/confirmedBookingRoutes')
const complainRoute = require('./routes/complainRoutes')
const serviceChargesRoute = require('./routes/servicesChargesRoutes')
const billRoute = require('./routes/billRoutes')
const ratingRoute = require('./routes/ratingRoutes')
const completedBookingRoute = require('./routes/completedBookingRoutes')
const driverRoute = require('./routes/driverRoute')
const fileUpload = require('express-fileupload')

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors')

const app = express();
dotenv.config()
connectDB()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Api is Running')
})


// Route
app.use('/api/admin', adminRoutes)

app.use('/api/mechanics', vehicleRoute)

app.use('/api/driver', driverRoute)

app.use('/api/carRegistration', carRegistrationRoute)

app.use('/api/towingVan', towingVanRoute)

app.use('/api/user', userRoute)

app.use('/api/booking', bookingRoute)

app.use('/api/confirmedbooking', confirmedBookingRoute)

app.use('/api/completedbooking', completedBookingRoute)

app.use('/api/complain', complainRoute)

app.use('/api/serviceCharges', serviceChargesRoute)

app.use('/api/bill', billRoute)

app.use('/api/rating', ratingRoute)


// Error Middleware
app.use(notFound)
app.use(errorHandler)

app.use(fileUpload({
    useTempFiles: true
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server Started On Port ' + PORT));

app.use(fileUpload({
    useTempFiles: true
}))