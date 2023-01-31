const express = require('express');
const { registerDriver } = require('../controllers/driverController');

const router = express.Router()

router.route('/register').post(registerDriver)

module.exports = router;