const { body } = require('express-validator');
const BodyType = require('../../modell/car/bodyTypeModell');

module.exports = class BodyTypeService {

    static async insertBodyType(bodyType){
        const querryBodyType = await BodyType.getBodyTypeByBodyType(bodyType);
        if(querryBodyType !== null){
            return querryBodyType.idbodytype;
        } else {
            const insertBodyType = new BodyType(bodyType);
            try{
                const id = insertBodyType.saveBodyType(bodyType);
                return id;
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}