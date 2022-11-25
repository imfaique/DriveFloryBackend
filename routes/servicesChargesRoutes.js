const express = require('express');
const { AddServiceCharges,
    findServiceCharges,
    getCarTuningServiceCharges,
    getCarAxleServiceCharges,
    getCarACServiceCharges } = require('../controllers/serviceChargesController');

const router = express.Router()

router.route('/:_id').get(findServiceCharges)
router.route('/Add').post(AddServiceCharges)
router.route('/cartuningServiceCharges').get(getCarTuningServiceCharges)
router.route('/caraxleServiceCharges').get(getCarAxleServiceCharges)
router.route('/caracServiceCharges').get(getCarACServiceCharges)

module.exports = router;