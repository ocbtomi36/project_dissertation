const User = require('../../modell/user/userModell')
const bcrypt = require('bcryptjs');

class UserDataValidateMiddleware {

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
    static async checkUserRole(req,res,next) {
        const { user_role } = req.body;
        const userRoles = ['admin','manager','employee'];
        if(!userRoles.includes(user_role)){
        return res.status(422).json({
            message: 'User role validation failed',
        })
    }
    next()
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
    static async checkUserId(req,res,next) {
        const { iduser } = req.params;
        const getUser = await User.getOneUserDataById(iduser);
        if(getUser === null) {
            return res.status(409).json({ message: 'There is no user with that id'})
        }
        req.user = getUser;
        next();
    }
}

module.exports = UserDataValidateMiddleware;
