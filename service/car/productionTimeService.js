const ProductionTime = require('../../modell/car/productionTimeModell');

module.exports = class ProductionTimeService {

    static async insertProductionTime(productionTime){
        const querryResultProdTime = await ProductionTime.getProductionTimeByProductionTime(productionTime);
        if(querryResultProdTime !== null){
            return querryResultColor.idproduction_time;
        } else {
            const insertProdTime = new ProductionTime(productionTime);
            try{
                return await insertProdTime.saveFuel(productionTime);
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}