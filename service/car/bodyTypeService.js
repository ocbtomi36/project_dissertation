const BodyType = require('../../modell/car/bodyTypeModell');

module.exports = class BodyTypeService {

    static async insertBodyType(bodyType){
        const querryBodyType = await BodyType.getBodyTypeByBodyType(bodyType);
        if(querryBodyType !== null){
            return querryResultBodyType.idproduction_time;
        } else {
            const insertBodyType = new BodyType(querryBodyType);
            try{
                return await insertBodyType.saveBodyType(bodyType);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}