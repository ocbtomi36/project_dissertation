const Manufacturer = require('../../modell/car/manufacturerModell');

module.exports = class ManufacturerService {

    static async insertManufacturer(manufacturer){
        const querryResultManufacturer = await Color.getManufacturerByManufacturer(manufacturer);
        if(querryResultManufacturer !== null){
            return querryResultManufacturer.idmanufacturer;
        } else {
            const insertManufacturer = new Manufacturer(color);
            try{
                return await insertManufacturer.saveManufacturer(manufacturer);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}