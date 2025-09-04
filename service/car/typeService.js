const Type = require('../../modell/car/typeModell');

module.exports = class TypeService {

    static async insertType(type){
        const querryResultColor = await Type.getTypeByType(type);
        if(querryResultColor !== null){
            return querryResultColor.idtype;
        } else {
            const insertType = new Type(color);
            try{
                return await insertColor.saveColor(color);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}