const express = require('express');
const { ConfirmedBookings, findConfirmedBooking, findBookingByTodayDate, findBookingByTomorrowDate, UpdateBooking, DeleteConfirmedBooking, findUserCompleteService } = require('../controllers/confirmedBookingController');

const router = express.Router()

router.route('/confirmedbooking').post(ConfirmedBookings)
router.route('/').get(findConfirmedBooking)
router.route('/bookingToday/:_id').get(findBookingByTodayDate)
router.route('/bookingTomorrow/:_id').get(findBookingByTomorrowDate)
router.route('/:_id').put(UpdateBooking)

router.route('/:_id').delete(DeleteConfirmedBooking)

router.route('/completebooking/:_id').get(findUserCompleteService)


module.exports = router;
