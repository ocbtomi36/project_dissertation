const Location = require('../modell/location/locationModell');
const AddressService = require('../service/address/addressService');

exports.addLocation = async (req,res,next) => {
    try {
        const { location_name, phone_number,locality_name, postal_code, street_name, street_type, house_number } = req.body;
        const fkAddress = await AddressService.insertAddress(locality_name, postal_code, street_name, street_type, house_number);
        const insertingLocation = new Location(location_name,phone_number, fkAddress);
        await insertingLocation.saveLocation();
        res.status(201).json({ message: 'Location is Created' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
exports.getOneLocation = async (req,res,next) => {
    try {
        res.status(200).json({message: 'Querry success', data: req.location});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
exports.updateLocation = async (req,res,next) => {
    try {
        const idlocation = req.params.idlocation;
        const { location_name, phone_number,locality_name, postal_code, street_name, street_type, house_number } = req.body;
        const fkAddress = await AddressService.insertAddress(locality_name, postal_code, street_name, street_type, house_number);
        const dbLocationNameLocationId = await Location.getLocationByLocationName(location_name);
        const dbPhoneNumberLocationId = await Location.getPhoneNumByPhoneNum(phone_number);
        const isLocationNameOk = dbLocationNameLocationId === null || dbLocationNameLocationId == idlocation;
        const isPhoneNumberOk = dbPhoneNumberLocationId === null || dbPhoneNumberLocationId == idlocation;

        if (isLocationNameOk && isPhoneNumberOk) {
            const updatingUser = new User(location_name,phone_number,fkAddress);
            await updatingUser.updateUserData(idlocation);
            return res.status(201).json({ message: 'Location update is success' });
        }

        return res.status(401).json({ message: 'Location name or phone number must be unique' });
        res.status(200).json({ message: 'Location is Updated' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}