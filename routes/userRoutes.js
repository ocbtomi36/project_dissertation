const express = require('express');

const { incommingDataResult } = require('../helper/helper');

const userJsonUpdateValidate = require('../validators/userValidator');
const addressValidator = require('../validators/addressValidator');
const userDataValidateMiddleware = require('../middleware/user/userDataValidateMiddleware')

const userController = require('../controller/userController')
const router = express.Router();

router.get('/users',userController.getAlluser);
router.get('/:iduser',userController.getOneUser);
router.put('/:iduser',[ userJsonUpdateValidate, addressValidator ], incommingDataResult,userDataValidateMiddleware.checkUserRole,userController.modifyUser);


module.exports = router