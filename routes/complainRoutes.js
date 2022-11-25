const express = require('express');
const { launchComplain, getComplains } = require('../controllers/complainController');

const router = express.Router()

router.route('/launchComplain').post(launchComplain)
router.route('/').get(getComplains)



module.exports = router;