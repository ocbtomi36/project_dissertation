const db = require('../../database/db');

module.exports = class ProductionTime {

    constructor(productionTime){
        this.productionTime = productionTime;
    }

    async saveFuel(){
            try {
                const [result] = await db.execute('INSERT INTO production_types (production_type) VALUES ( ? )',
                    [this.productionTime]);
                    return result.insertId;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
            }
    static async getProductionTimeByProductionTime(productionTime){
        try {
            const [row] = await db.query('SELECT * FROM production_times where production_time = ?',[productionTime]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
    }
}