const Type = require('../../modell/car/typeModell');

module.exports = class TypeService {

    static async insertType(type){
        const querryResultType = await Type.getTypeByType(type);
        if(querryResultType !== null){
            return querryResultType.idtype;
        } else {
            const insertType = new Type(type);
            try{
                const id = await insertType.saveType(type);
                return id;
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}