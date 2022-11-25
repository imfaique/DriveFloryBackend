const express = require('express');
const { AddTowingVan, getTowingVan } = require('../controllers/towingVanController')

const router = express.Router()

router.route('/Add').post(AddTowingVan)
router.route('/Get').get(getTowingVan)

module.exports = router;