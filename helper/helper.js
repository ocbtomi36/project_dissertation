const { validationResult } = require('express-validator');

const validateUserInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed.',
            errors: errors.array()
        });
    }
    next();
};
const validateIncommingUserRole = (req, res, next) => {
    const userRole = req.body.user_role;
    const userRoles = ['admin','manager','employee'];
    if(!userRoles.includes(userRole)){
        return res.status(422).json({
            message: 'User role validation failed',
        })
    }
    next()
}
module.exports = {
    validateUserInput,
    validateIncommingUserRole
};