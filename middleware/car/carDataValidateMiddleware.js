const Car = require('../../modell/car/carModell');
 
class CarDataValidateMiddleware {

    static async checkVinNumber(req,res,next) {
        const { vin_number } = req.body;
        const getVinNumber = await Car.getCarByVinNumber(vin_number);
        if(getVinNumber !== null){
            return res.status(409).json({ message: 'vin number must be unique'})
        }
        next();
    }

}

module.exports = CarDataValidateMiddleware;