const express = require('express');
const { registerDriver, authMechanic, getCarTuningMechanic, getCarAxleMechanic, getCarACMechanic, getBikeMechanic } = require('../controllers/vehicleController');

const router = express.Router()

router.route('/register').post(registerDriver)
router.route('/login').post(authMechanic)
router.route('/cartuning').get(getCarTuningMechanic)
router.route('/caraxle').get(getCarAxleMechanic)
router.route('/carac').get(getCarACMechanic)
router.route('/bike').get(getBikeMechanic)

module.exports = router;