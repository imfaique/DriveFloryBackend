const express = require('express');
const { registerCar, authCarOwner, getCar, getHiace, getCoaster } = require('../controllers/carRegistrationController');

const router = express.Router()

router.route('/register').post(registerCar)
router.route('/login').post(authCarOwner)
router.route('/car').get(getCar)
router.route('/hiace').get(getHiace)
router.route('/coaster').get(getCoaster)




module.exports = router;