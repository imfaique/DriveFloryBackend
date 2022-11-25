const express = require('express');
const { GenerateBill, findBill } = require('../controllers/billController');

const router = express.Router()

router.route('/generateBill').post(GenerateBill)
router.route('/').get(findBill)


module.exports = router;
