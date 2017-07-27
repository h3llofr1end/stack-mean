var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOther = require('../controllers/other');

router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

router.get('/about', ctrlOther.about);

module.exports = router;
