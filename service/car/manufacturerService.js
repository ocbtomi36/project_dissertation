const Manufacturer = require('../../modell/car/manufacturerModell');

module.exports = class ManufacturerService {

    static async insertManufacturer(manufacturer){
        const querryResultManufacturer = await Manufacturer.getManufacturerByManufacturer(manufacturer);
        if(querryResultManufacturer !== null){
            return querryResultManufacturer.idmanufacturer;
        } else {
            const insertManufacturer = new Manufacturer(manufacturer);
            try{
                const id = await insertManufacturer.saveManufacturer(manufacturer);
                return id;
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}