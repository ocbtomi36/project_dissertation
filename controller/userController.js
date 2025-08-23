
const User = require('../modell/user/userModell');
const AddressService = require('../service/address/addressService');


exports.getAlluser = async (req,res,next) => {
    try {
        const result = await User.getAllUserData();
    if(result !== null) {
        res.status(200).json({message: 'Querry success', data: result});
    } else {
        res.status(200).json({message: 'There is no data in database'})
    }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}
exports.getOneUser = async (req,res,next) => {
    const { iduser } = req.params;
    try {
        const result = await User.getOneUserDataById(iduser);
        console.log(result);
    if(result !== null) {
        res.status(200).json({message: 'Querry success', data: result});
    } else {
        res.status(200).json({message: 'There is no data in database'});
    }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
exports.modifyUser = async (req,res,next) => {
    try {
        const { given_name, family_name, pin_number, user_role, email, password, locality_name, postal_code, street_name, street_type, house_number } = req.body;
        const { iduser } = req.params;

        const fkAddress = await AddressService.insertAddress(locality_name, postal_code, street_name, street_type, house_number);
        console.log(fkAddress);
        // prepare data to insert kész
        // check pin number and email if exist ? if yes yes than whom is it same as params ok 
        console.log('itt vagyok');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}