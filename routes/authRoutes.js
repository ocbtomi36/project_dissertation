const express = require('express');

const { body } = require('express-validator');

const { validateUserInput, validateIncommingUserRole } = require('../helper/helper')

const authController = require('../controller/authController')
const userMiddleware = require('../middleware/userMiddleware')
const router = express.Router();

router.post('/signup', [
    
    body('given_name').trim().isLength({min:1,max:50}).withMessage('length of given name is incorrect'),
    body('family_name').trim().isLength({min:1,max:50}).withMessage('length of family name is incorrect'),
    body('pin_number').trim().isLength({min:8,max:8}).withMessage('length of pin number is incorrect'), //database format must be date then i get back YYYY-MM-DD string
    body('user_role').trim().isLength({min:1,max:45}).withMessage('length of user rolle is incorrect'),
    body('email').trim().isEmail().normalizeEmail().withMessage("this field must be an valid e-mail format"),
    body('password').trim().isLength({min:1,max:100}).withMessage('length of last name is incorrect'),
    validateUserInput, 
    validateIncommingUserRole,
    userMiddleware.validatePinNumber,
    userMiddleware.checkPinNumber,
    userMiddleware.checkEmail]
    ,authController.signup);

module.exports = router;