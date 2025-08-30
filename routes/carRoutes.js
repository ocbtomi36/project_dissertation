const express = require('express');

const { incommingDataResult } = require('../helper/helper');
const carJsonInsertValidate = require('../validators/carValidator');

const carController = require('../controller/carController')

const router = express.Router();

router.post('car',[carJsonInsertValidate], carController.getAllCars);

module.exports = router