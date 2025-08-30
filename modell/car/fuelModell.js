const db = require('../../database/db');

module.exports = class Fuel {

    constructor(fuel){
        this.fuel = fuel
    }

    async saveFuel(){
            try {
                const [result] = await db.execute('INSERT INTO fuels (fuel) VALUES ( ? )',
                    [this.fuel]);
                    return result.insertId;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
            }
    static async getFuelByFuel(fuel){
        try {
            const [row] = await db.query('SELECT * FROM fuels where fuel = ?',[fuel]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
    }
}