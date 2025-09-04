const Fuel = require('../../modell/car/fuelModell');

module.exports = class FuelService {

    static async insertFuel(fuel){
        const querryResultFuel = await Fuel.getFuelByFuel(fuel);
        if(querryResultFuel !== null){
            return querryResultFuel.idfuel;
        } else {
            const insertFuel = new Fuel(fuel);
            try{
                return await insertFuel.saveFuel(fuel);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}