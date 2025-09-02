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