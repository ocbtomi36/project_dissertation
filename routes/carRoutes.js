const express = require('express');

const { incommingDataResult, numberValidator } = require('../helper/helper');
const carJsonInsertValidate = require('../validators/carValidator');

const carController = require('../controller/carController');
const LocationDataValidateMiddleware = require('../middleware/location/locationDataValidateMiddleware');
const CarDataValidateMiddleware = require('../middleware/car/carDataValidateMiddleware');

const router = express.Router();

router.post('/car',numberValidator('car_performance'),numberValidator('engine_size'),[carJsonInsertValidate],incommingDataResult,CarDataValidateMiddleware.checkVinNumber,LocationDataValidateMiddleware.getLocationIdByLocationName, carController.insertCar);

module.exports = router