const Car = require('../../modell/car/carModell');
const { isValidDate } = require('../../helper/carHelper')
 
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

    static async checkLicencePlate(req,res,next) {
        let { licence_plate } = req.body;
        const regex = /^([A-Z]{3,4}-?\d{3,4})$/;
        if(licence_plate !== undefined){
            licence_plate = licence_plate.toUpperCase().trim();
            if (!regex.test(licence_plate)) {
                return res.status(400).json({ mesesage: "Not valid hungarian licence plate format" });
            }
            const getLicencePlate = await Car.getCarByLicencePlate(licence_plate);
            if(getLicencePlate !==  null){
                return res.status(409).json({ message: ' licence plate is already exist'})
            }
        }
        next();
    }

    static checkTechnicalValidity(req,res,next) {

        const { technical_validity } = req.body;
        if( technical_validity !== undefined) {
            const date = isValidDate(technical_validity);
            if (!date) {
                return res.status(400).json({ mesesage: "Not valid date format" });
            }
            const inputDate = new Date(technical_validity);
            const today = new Date();
            today.setHours(0,0,0,0);
            if(today > inputDate) {
                return res.status(400).json({ message: "Invalid date/time, the date has already passed"})
            }
            req.technical_validity = technical_validity;
        }
        next();
    }

    static checkProductionTime(req,res,next) {

        const { production_time } = req.body;
        const date = isValidDate(production_time);
        if (!date) {
                return res.status(400).json({ mesesage: "Not valid date format" });
        }
        const inputDate = new Date(production_time);
        const minDate = new Date("1950-01-01");
        if(inputDate < minDate) {
            return res.status(400).json({ message: "Production time must be older than 1949"})
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