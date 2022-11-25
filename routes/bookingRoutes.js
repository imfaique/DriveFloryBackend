const express = require('express');
const { Bookings,
    findPendingBooking,
    findMechanicPendingBooking,
    findConfirmedBooking,
    findMechanicConfirmedBooking,
    findBooking,
    DeleteBooking,
    UpdateBooking
} = require('../controllers/bookingController');

const router = express.Router()


router.route('/booking').post(Bookings)
router.route('/').get(findBooking)
router.route('/:_id').get(findPendingBooking)
router.route('/mechanicPendingBooking/:_id').get(findMechanicPendingBooking)
router.route('/confirmed/:_id').get(findConfirmedBooking)
router.route('/mechanicConfirmedBooking/:_id').get(findMechanicConfirmedBooking)
router.route('/:_id').delete(DeleteBooking)
router.route('/:_id').put(UpdateBooking)

module.exports = router;