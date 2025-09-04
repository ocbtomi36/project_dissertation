const ManufacturerType = require('../../modell/car/manufacturer_types/manufacturer_types');
const ManufacturerService = require('./manufacturerService');
const TypeService = require('./typeService');


module.exports = class ManufacturerTypeService {

    static async insertManufacturerType(manufacturer, Ttype){
        const fkManufacturer = await ManufacturerService.insertManufacturer(manufacturer);
        const fkType = await TypeService.insertType(Ttype);
        try{
        const insertManufacturerType = new ManufacturerType(fkManufacturer, fkType);
        return await insertManufacturerType.saveManufacturerTypes();
        } catch {
            res.status(500).json({ message: error})
        }
    }
}