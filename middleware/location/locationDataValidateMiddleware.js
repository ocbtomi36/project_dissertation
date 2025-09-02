const Location = require('../../modell/location/locationModell');

class LocationDataValidateMiddleware {
/** Location and Phone number are unique, */

    static async checkLocationName(req,res,next) {
        const { location_name } = req.body;
        const getLocation = await Location.getLocationByLocationName(location_name);
        if(getLocation !== null){
            return res.status(409).json({ message: 'Location must be unique'})
        }
        next();
    }

    static async checkPhoneNumberNumber(req,res,next) {
        const { phone_number } = req.body;
        const getPhoneNumber = await Location.getPhoneNumByPhoneNum(phone_number);
        if(getPhoneNumber != null){
            return res.status(409).json({ message: 'Phone number must be unique'})
        }
        next();
    }


}

module.exports = LocationDataValidateMiddleware;
