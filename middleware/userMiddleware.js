const User = require('../modell/userModell')
const bcrypt = require('bcryptjs');

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
    static async loginUser(req,res,next){
        const { email, password } = req.body;   
        try{
            const loadedUser = await User.GetUserByIncommingEmail(email);
            if(loadedUser === null){
                return res.status(401).json({ message: 'There is no user with that email' })
            }
            const loadedPassword = loadedUser.password;
            const isPasswordMatch = await bcrypt.compare(password,loadedPassword);
            if(!isPasswordMatch){
                return res.status(401).json({ message: 'Wrong password' })
            }
            req.user = loadedUser;
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'An login error occured'})
        }
    }
}

module.exports = UserMiddleware;