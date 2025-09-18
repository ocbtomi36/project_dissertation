const Car = require('../modell/car/carModell');
const BodyTypeService = require('../service/car/bodyTypeService');
const ColorService = require('../service/car/colorService');
const FuelService = require('../service/car/fuelService');
const ManufacturerTypeService = require('../service/car/manufacturerTypeService');
const ProductionTimeService = require('../service/car/productionTimeService');

exports.getAllCars = async (req,res,next) => {

}

exports.insertCar = async (req,res,next) => {
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, manufacturer, type } = req.body;
    try{
        const idLocation = req.idLocation;
        const production_time_idproduction_time = await ProductionTimeService.insertProductionTime(production_time);
        const colors_idcolor = await ColorService.insertColor(color);
        const bodytypes_idbodytype = await BodyTypeService.insertBodyType(bodytype);
        const fuels_idfuel = await FuelService.insertFuel(fuel);
        const manufacturer_types_idmanufacturer_types = await ManufacturerTypeService.insertManufacturerType(manufacturer,type);
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
        const carId = req.params.carId;
        const locations_idlocation = req.idLocation;
        const production_time_idproduction_time = await ProductionTimeService.insertProductionTime(production_time);
        const colors_idcolor = await ColorService.insertColor(color);
        const bodytypes_idbodytype = await BodyTypeService.insertBodyType(bodytype);
        const fuels_idfuel = await FuelService.insertFuel(fuel);
        const manufacturer_types_idmanufacturer_types = await ManufacturerTypeService.insertManufacturerType(manufacturer,type);
        const updateCar = new Car(vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel, locations_idlocation, manufacturer_types_idmanufacturer_types);
        //await updateCar.updateCar(carId);
        //return res.status(201).json({ message: "Car updated successfully"});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
}