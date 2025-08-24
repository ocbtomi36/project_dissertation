
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
        const dbPinNumberUserId = await User.GetsIdUserByIncommingPinNumber(pin_number);
        const dbEmailUserId = await User.GetsIdUserByIncommingEmail(email);
        const isEmailOk = dbEmailUserId === null || dbEmailUserId == iduser;
        const isPinOk   = dbPinNumberUserId === null || dbPinNumberUserId == iduser;

        if (isEmailOk && isPinOk) {
            const updatingUser = new User(given_name, family_name, pin_number, user_role, email, password,fkAddress);
            await updatingUser.updateUserData(iduser);
            return res.status(201).json({ message: 'User update success' });
        }

        return res.status(401).json({ message: 'email or pin number must be unique' });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}