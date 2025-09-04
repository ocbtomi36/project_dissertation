const db = require('../../../database/db');

module.exports = class ManufacturerTypes {

    constructor(typesId,manufacturerId){
        this.typesId = typesId,
        this.manufacturerId = manufacturerId
    }

    async saveManufacturerTypes(){
            try {
                const [result] = await db.execute('INSERT INTO manufacturer_types (types_idtype, manufacturers_idmanufacturer) VALUES (? , ?);',
                    [this.typesId, this.manufacturerId]);
                    return result.insertId;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
            }
    static async getManufacturersTypesByIds(types_idType,manufacturer_idmanufacturer){
        try {
            const [row] = await db.query('SELECT * FROM manufacturer_types where types_idtype = ? and manufacturers_idmanufacturer = ?',[types_idType,manufacturer_idmanufacturer]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
    }
}