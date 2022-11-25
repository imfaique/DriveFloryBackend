const express = require('express');
const { registerMechanic, authMechanic, getCarTuningMechanic, getCarAxleMechanic, getCarACMechanic, getBikeMechanic } = require('../controllers/mechanicController');

const router = express.Router()

router.route('/register').post(registerMechanic)
router.route('/login').post(authMechanic)
router.route('/cartuning').get(getCarTuningMechanic)
router.route('/caraxle').get(getCarAxleMechanic)
router.route('/carac').get(getCarACMechanic)
router.route('/bike').get(getBikeMechanic)

module.exports = router;