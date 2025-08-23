const LocalityName = require('../../modell/adress/localityNameModell');

module.exports = class LocalityNameService {

    static async insertLocalityName(locality_name){
        const querryResultLocalityName = await LocalityName.getLocalityNameByLocName(locality_name);
        if(querryResultLocalityName !== null){
            return querryResultLocalityName.idlocality_name;
        } else {
            const localityName = new LocalityName(locality_name);
            try{
                return await localityName.saveLocalityName(locality_name);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}