const express = require('express');
const { registerCar, authCarOwner } = require('../controllers/carRegistrationController');

const router = express.Router()

router.route('/register').post(registerCar)
router.route('/login').post(authCarOwner)
// router.route('/cartuning').get(getCarTuningMechanic)
// router.route('/caraxle').get(getCarAxleMechanic)
// router.route('/carac').get(getCarACMechanic)
// router.route('/bike').get(getBikeMechanic)

module.exports = router;