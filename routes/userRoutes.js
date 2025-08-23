const express = require('express');

const { incommingDataResult } = require('../helper/helper');

const userJsonUpdateValidate = require('../validators/userValidator');
const addressValidator = require('../validators/addressValidator');

const userController = require('../controller/userController')
const router = express.Router();

router.get('/users',userController.getAlluser);
router.get('/:iduser',userController.getOneUser);
router.put('/:iduser',[ userJsonUpdateValidate, addressValidator ], incommingDataResult,userController.modifyUser);


module.exports = router