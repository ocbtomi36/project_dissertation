const express = require('express');

const { incommingDataResult } = require('../helper/helper');
const carJsonInsertValidate = require('../validators/carValidator');

const router = express.Router();

router.post('car',[carJsonInsertValidate]);