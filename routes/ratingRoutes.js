const express = require('express');
const { Ratings, getRating } = require('../controllers/ratingController');
const router = express.Router()

router.route('/').get(getRating)
router.route('/rating').post(Ratings)

module.exports = router;
