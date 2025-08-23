const StreetType = require('../../modell/adress/streetTypeModell');

module.exports = class StreetTypeService {


    static async insertStreetType(street_type){
        const querryResultStreetType = await StreetType.getStreetTypes(street_type);
        if(querryResultStreetType !== null){
            return querryResultStreetType.idstreet_type;
        } else {
            const streetType = new StreetType(street_type);
            try{
                return await streetType.saveStreetTypes(street_type);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }

    
}