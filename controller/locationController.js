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

exports.getAllLocation = async (req,res,next) => {
    try {
        const locations = await Location.getAllLocation();
    if(locations !== null) { 
        res.status(200).json({message: 'Querry success', data: locations});
    } else { 
        res.status(200).json({message: 'There is no data in database'});
     }
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
        const { idlocation } = req.params;
        const { location_name, phone_number,locality_name, postal_code, street_name, street_type, house_number } = req.body;
        const fkAddress = await AddressService.insertAddress(locality_name, postal_code, street_name, street_type, house_number);
        const dbLocationNameLocationId = await Location.getLocationByLocationName(location_name);
        const dbPhoneNumberLocationId = await Location.getPhoneNumByPhoneNum(phone_number);
        const isLocationNameOk = dbLocationNameLocationId === null || dbLocationNameLocationId.idlocation == idlocation;
        const isPhoneNumberOk = dbPhoneNumberLocationId === null || dbPhoneNumberLocationId.idlocation == idlocation;
        if (isLocationNameOk && isPhoneNumberOk) {
            const updatingLocation = new Location(location_name,phone_number,fkAddress);
            await updatingLocation.updateLocation(idlocation);
            return res.status(201).json({ message: 'Location update is success' });
        }

        return res.status(401).json({ message: 'Location name or phone number must be unique' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}