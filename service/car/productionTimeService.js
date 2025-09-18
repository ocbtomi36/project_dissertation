const ProductionTime = require('../../modell/car/productionTimeModell');

module.exports = class ProductionTimeService {

    static async insertProductionTime(productionTime){
        const querryResultProdTime = await ProductionTime.getProductionTimeByProductionTime(productionTime);
        if(querryResultProdTime !== null){
            return querryResultProdTime.idproduction_time;
        } else {
            const insertProdTime = new ProductionTime(productionTime);
            try{
                const id = insertProdTime.saveProductionTime();
                return id;
            } catch {
                res.status(500).json({ message: error})
            }
        }
    }
}