const User = require('../modell/user/userModell');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res,next) => {
    try {
        const {given_name, family_name,pin_number, user_role, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,13);
        const hashedPinNumber = await bcrypt.hash(pin_number,13);
        const insertingUser = new User(given_name, family_name,hashedPinNumber, user_role, email,hashedPassword);
        await insertingUser.save();
                res.status(201).json({
                message: 'User is Created'})
    } catch (error) {
        res.status(500).json({ message: error})
    }
        
}
exports.login = async(req,res,next) => {
    try{
    const loadedUser = req.user;
    const token = jwt.sign({
        email: loadedUser.email,
        iduser: loadedUser.iduser,
        role: loadedUser.role
    }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.status(200).json({token: token, userId: loadedUser.iduser.toString()})
    } catch(error){
        console.log(error)
        res.status(500).json({message: 'An login error occured'})
    }
}