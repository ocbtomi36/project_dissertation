const express = require('express');

const { incommingDataResult, typeNumberValidator } = require('../helper/helper');
const carJsonInsertValidate = require('../validators/carValidator');

const carController = require('../controller/carController');
const LocationDataValidateMiddleware = require('../middleware/location/locationDataValidateMiddleware');
const CarDataValidateMiddleware = require('../middleware/car/carDataValidateMiddleware');

const router = express.Router();


router.post('/car',typeNumberValidator('car_performance'),typeNumberValidator('engine_size'),[carJsonInsertValidate],incommingDataResult,CarDataValidateMiddleware.checkVinNumber,CarDataValidateMiddleware.checkLicencePlate,CarDataValidateMiddleware.checkTechnicalValidity,CarDataValidateMiddleware.checkProductionTime, LocationDataValidateMiddleware.getLocationIdByLocationName, carController.insertCar);
router.put('/:carId', typeNumberValidator('car_performance'), typeNumberValidator('engine_size'), CarDataValidateMiddleware.checkId, [carJsonInsertValidate],incommingDataResult,CarDataValidateMiddleware.checkLicencePlateOnUpdate,CarDataValidateMiddleware.checkTechnicalValidity,CarDataValidateMiddleware.checkProductionTime, CarDataValidateMiddleware.checkVinNumberOnUpdate, LocationDataValidateMiddleware.getLocationIdByLocationName,carController.updateCar);

module.exports = router
