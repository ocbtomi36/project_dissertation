const User = require('../modell/userModell');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res,next) => {
    try {
        const {given_name, family_name,pin_number, user_role, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,13);
        const insertingUser = new User(given_name, family_name,pin_number, user_role, email,hashedPassword);
        await insertingUser.save();
                res.status(201).json({
                message: 'User is Created'})
    } catch (error) {
        res.status(500).json({ message: 'An teszt error occured'})
    }
        
}