const Car = require('../modell/car/carModell');
const BodyTypeService = require('../service/car/bodyTypeService');
const ColorService = require('../service/car/colorService');
const FuelService = require('../service/car/fuelService');
const ManufacturerService = require('../service/car/manufacturerService');
const ManufacturerTypeService = require('../service/car/manufacturerTypeService');
const LocationModell = require('../modell/location/locationModell');
const ProductionTimeService = require('../service/car/productionTimeService');
const TypeService = require('../service/car/typeService');
/** Require services */

exports.getAllCars = async (req,res,next) => {

}

exports.insertCar = async (req,res,next) => {
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, location, manufacturer_type } = req.body;
    try{
        let fkLocation = await LocationModell.getLocationByLocationName(location);
        if(fkLocation === null) {
        return res.status(400).json({ message: 'Location does not exist'});
        } 
        fkLocation = fkLocation.idlocation;
        console.log(fkLocation);
}   catch (error) {
    return res.status(500).json({ message: error.message });
}
}