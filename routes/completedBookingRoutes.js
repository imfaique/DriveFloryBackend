const express = require('express');
const { CompletedBookings, getCompleteBooking, DeleteCompletedBooking } = require('../controllers/completedBookingController');

const router = express.Router()

router.route('/completedbooking').post(CompletedBookings)
router.route('/:_id').get(getCompleteBooking)
router.route('/:_id').delete(DeleteCompletedBooking)

module.exports = router;
