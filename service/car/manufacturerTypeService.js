const ManufacturerType = require('../../modell/car/manufacturer_types/manufacturer_types');
const ManufacturerService = require('./manufacturerService');
const TypeService = require('./typeService');


module.exports = class ManufacturerTypeService {

    static async insertManufacturerType(manufacturer, type){
        const fkManufacturer = await ManufacturerService.insertManufacturer(manufacturer);
        const fkType = await TypeService.insertType(type);
        const getManufacturerType = await ManufacturerType.getManufacturersTypesByIds(fkManufacturer,fkType);
        try{
            if(getManufacturerType !== null){
                return getManufacturerType.idmanufacturer_types;
            } else {
            const insertManufacturerType = new ManufacturerType(fkManufacturer, fkType);
            return await insertManufacturerType.saveManufacturerTypes();
            }
        } catch {
            res.status(500).json({ message: error})
        }
    }
}