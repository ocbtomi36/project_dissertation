const { body } = require('express-validator');

    const carJsonValidate = [
        body('color').trim().isLength({min:1,max:45}).withMessage('length of color is incorrect'),
    ];
module.exports = carJsonValidate;