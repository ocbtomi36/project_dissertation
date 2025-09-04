const express = require('express');

const { incommingDataResult } = require('../helper/helper');
const carJsonInsertValidate = require('../validators/carValidator');

const carController = require('../controller/carController');
const LocationDataValidateMiddleware = require('../middleware/location/locationDataValidateMiddleware');

const router = express.Router();

router.post('/car',[carJsonInsertValidate],incommingDataResult,LocationDataValidateMiddleware.getLocationIdByLocationName, carController.insertCar);

module.exports = router