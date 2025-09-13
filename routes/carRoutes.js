const express = require('express');

const { incommingDataResult, typeNumberValidator } = require('../helper/helper');
const carJsonInsertValidate = require('../validators/carValidator');

const carController = require('../controller/carController');
const LocationDataValidateMiddleware = require('../middleware/location/locationDataValidateMiddleware');
const CarDataValidateMiddleware = require('../middleware/car/carDataValidateMiddleware');

const router = express.Router();

router.post('/car',typeNumberValidator('car_performance'),typeNumberValidator('engine_size'),[carJsonInsertValidate],incommingDataResult,CarDataValidateMiddleware.checkVinNumber,LocationDataValidateMiddleware.getLocationIdByLocationName, carController.insertCar);
router.put('/:carId',carController.updateCar);
module.exports = router