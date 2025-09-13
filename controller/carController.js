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
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, manufacturer, type } = req.body;
    try{
        // a dátum validálása később, most a lényeg, hogy be kerüljön az adatbázisba!
        const idLocation = req.idLocation;
        const production_time_idproduction_time = await ProductionTimeService.insertProductionTime(production_time);
        const colors_idcolor = await ColorService.insertColor(color);
        const bodytypes_idbodytype = await BodyTypeService.insertBodyType(bodytype);
        const fuels_idfuel = await FuelService.insertFuel(fuel);
        const manufacturer_types_idmanufacturer_types = await ManufacturerTypeService.insertManufacturerType(manufacturer,type);
        console.log(manufacturer_types_idmanufacturer_types);
        const insertCar = new Car(vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel,idLocation, manufacturer_types_idmanufacturer_types);
        return res.status(201).json({ message: "Car inserted successfully", carId: await insertCar.saveCar() });
        }   catch (error) {

            return res.status(500).json({ message: error.message });
        }
}
// update method is working properly 
exports.updateCar = async (req,res,next) => {
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, manufacturer, type } = req.body;
    try{
        // a dátum validálása később, most a lényeg, hogy be kerüljön az adatbázisba!
        const carId = req.params.carId;
        const updateCar = new Car(vin_number, car_performance, engine_size, licence_plate, technical_validity, 1, 1, 1, 1, 1, 3);
        await updateCar.updateCar(carId);
        return res.status(201).json({ message: "Car updated successfully"});
        //return res.status(201).json({ message: "Car inserted successfully", carId: await insertCar.saveCar() });
        }   catch (error) {

            return res.status(500).json({ message: error.message });
        }
}