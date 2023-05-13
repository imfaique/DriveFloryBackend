const express = require('express');
const { registerDriver, getDriver } = require('../controllers/driverController');

const router = express.Router()

router.route('/register').post(registerDriver)
router.route('/').get(getDriver)

module.exports = router;