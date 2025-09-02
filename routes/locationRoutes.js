const express = require('express');

const { incommingDataResult } = require('../helper/helper');

const router = express.Router();
const locationValidator = require('../validators/locationValidator');

router.post('/location',[locationValidator],incommingDataResult);



module.exports = router