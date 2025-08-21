const express = require('express');

const { body } = require('express-validator');

const { incommingDataResult, validateIncommingUserRole } = require('../helper/helper')

const authController = require('../controller/authController');
const userMiddleware = require('../middleware/userMiddleware');
const userValidator  = require('../validators/userValidator');
const adressValidator = require('../validators/addressValidator');
const router = express.Router();

router.post('/signup', authController.signup);

/*
router.post('/login', [
    body('email').trim().isEmail().normalizeEmail().withMessage("this field must be an valid e-mail format"),
    body('password').trim().isLength({min:1,max:100}).withMessage('length of password is incorrect')
    ],
    incommingDataResult,userMiddleware.loginUser,authController.login

);
*/
module.exports = router;