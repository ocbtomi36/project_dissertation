const Type = require('../../modell/car/typeModell');

module.exports = class TypeService {

    static async insertType(type){
        const querryResultType = await Type.getTypeByType(type);
        if(querryResultType !== null){
            return querryResultType.idtype;
        } else {
            const insertType = new Type(type);
            try{
                return await insertType.saveType(type);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}