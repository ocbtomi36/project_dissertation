const Car = require('../../modell/car/carModell');
 
class CarDataValidateMiddleware {

    static async checkId(req,res,next){
        const { carId } = req.params;
        const checkid = await Car.getCarById(carId);
        if(checkid === null) {
            return res.status(409).json({ message: 'there is no data with that id'})
        }
        next();
    }

    static async checkVinNumber(req,res,next) {
        const { vin_number } = req.body;
        const getVinNumber = await Car.getCarByVinNumber(vin_number);
        if(getVinNumber !== null){
            return res.status(409).json({ message: 'vin number must be unique'})
        }
        next();
    }

    static async checkVinNumberOnUpdate(req,res,next) {

        const { vin_number } = req.body;
        const { carId } = req.params;
        const getVinNumber = await Car.getCarByVinNumber(vin_number);
        if(getVinNumber !== null && carId != getVinNumber.idcar){
            return res.status(409).json({ message: ' vin number is already exist under diffrerent id'})
        }
        next();


    }

    static checkLicencePlate(req,res,next) {
        let { licence_plate } = req.body;
        if (!licence_plate) return res.status(400).json({ error: "missing licence_plate field" });

        licence_plate = licence_plate.toUpperCase().trim();

        const regex = /^([A-Z]{3,4}-?\d{3,4})$/;

        if (!regex.test(licence_plate)) {
            return res.status(400).json({ mesesage: "Not valid hungarian licence plate format" });
        }
        next();
    }

    static checkTechnicalValidity(req,res,next) {

        const { technical_validity } = req.body;
        const now = new Date();
        let formattedToday = now.toISOString().substring(0,10);
        if(formattedToday > technical_validity) {
            return res.status(400).json({ message: "Invalid date/time, the date has already passed"})
        } 
        req.technical_validity = technical_validity;

        next();
    }

    static checkProductionTime(req,res,next) {

        const { production_time } = req.body;
        
        if(production_time < '1950-01-01') {
            return res.status(400).json({ message: "Production time must be younger than 1949"})
        } 
        req.production_time = production_time;

        next();
    }

}



module.exports = CarDataValidateMiddleware;

/*

"licence_plate": "AEGP381", megfelelő e a formátuma 
"technical_validity": "2026-08-30", a dátum formátum stimmel e és multbeli idő nem lehet .
"production_time": "2023-05-15", túl régi nem lehet 1950 -től 

*/