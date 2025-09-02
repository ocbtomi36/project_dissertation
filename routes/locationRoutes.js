const express = require('express');

const { incommingDataResult } = require('../helper/helper');

const router = express.Router();
const locationValidator = require('../validators/locationValidator');
const addressValidator = require('../validators/addressValidator');
const locationDataValidateMiddleware = require('../middleware/location/locationDataValidateMiddleware');
const locationController = require('../controller/locationController')

router.post('/location',[locationValidator, addressValidator],incommingDataResult,locationDataValidateMiddleware.checkLocationName,locationDataValidateMiddleware.checkPhoneNumberNumber,locationController.addLocation);
router.put('/location/:idlocation',[locationValidator, addressValidator],incommingDataResult,locationDataValidateMiddleware.checkLocationName,locationDataValidateMiddleware.checkPhoneNumberNumber,locationController.updateLocation);


module.exports = router

