const express = require('express');

const { body } = require('express-validator');

const { incommingDataResult } = require('../helper/helper')

const authController = require('../controller/authController');
const userDataValidateMiddleware = require('../middleware/user/userDataValidateMiddleware');
const userValidator  = require('../validators/userValidator');
const addressValidator = require('../validators/addressValidator');
const router = express.Router();

router.post('/signup',[ userValidator,addressValidator ],userDataValidateMiddleware.checkPinNumber,userDataValidateMiddleware.checkEmail,incommingDataResult,userDataValidateMiddleware.checkUserRole, authController.signup);

/*
router.post('/login', [
    body('email').trim().isEmail().normalizeEmail().withMessage("this field must be an valid e-mail format"),
    body('password').trim().isLength({min:1,max:100}).withMessage('length of password is incorrect')
    ],
    incommingDataResult,userMiddleware.loginUser,authController.login

);
*/
module.exports = router;