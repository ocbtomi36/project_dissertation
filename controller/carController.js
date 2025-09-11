const Car = require('../modell/car/carModell');
const BodyTypeService = require('../service/car/bodyTypeService');
const ColorService = require('../service/car/colorService');
const FuelService = require('../service/car/fuelService');
const ManufacturerTypeService = require('../service/car/manufacturerTypeService');
const ProductionTimeService = require('../service/car/productionTimeService');
/** Require services */

exports.getAllCars = async (req,res,next) => {

}

exports.insertCar = async (req,res,next) => {
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, manufacturer_type, type } = req.body;
    try{
        const insertCarPerformance = car_performance.toString();
        const insertEngineSize = engine_size.toString();
        console.log(insertEngineSize);
        /*
        const idLocation = req.idLocation;
        const production_time_idproduction_time = await ProductionTimeService.insertProductionTime(production_time);
        const colors_idcolor = await ColorService.insertColor(color);
        const bodytypes_idbodytype = await BodyTypeService.insertBodyType(bodytype);
        const fuels_idfuel = await FuelService.insertFuel(fuel);
        const manufacturer_types_idmanufacturer_types = await ManufacturerTypeService.insertManufacturerType(manufacturer_type,type);

        const insertCar = new Car(vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel, manufacturer_types_idmanufacturer_types, idLocation);
        return res.status(201).json({ message: "Car inserted successfully", carId: await insertCar.saveCar() });
        */
        }   catch (error) {

            return res.status(500).json({ message: error.message + " Ez ittt a hiba " });
        }
}