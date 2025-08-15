const User = require('../modell/userModell')

class UserMiddleware {

    static async checkEmail(req,res,next) {
        const { email } = req.body;
        const isEmailExists = await User.EmailExistsByIncommingData(email);
        if(isEmailExists){
            return res.status(409).json({ message: 'Email must be unique'})
        }
        next();
    }

    static async checkPinNumber(req,res,next) {
        const { pin_number } = req.body;
        const isPinNumberExists = await User.PinNumberExistsByIncommingData(pin_number);
        if(isPinNumberExists){
            return res.status(409).json({ message: 'Pin number must be unique'})
        }
        next();
    }
    static validatePinNumber(req,res,next) {
        const { pin_number } = req.body;
        const regex =  /^[A-Z]{2}[0-9]{6}$/;
        if(!regex.test(pin_number)){
            return res.status(409).json({ message: 'Wrong pin number format'})
        }
        next();
    }
}

module.exports = UserMiddleware;