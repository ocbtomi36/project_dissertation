const db = require('../../database/db');

module.exports = class TypeModell {

    constructor(type){
        this.type = type
    }

    async saveType(){
            try {
                const [result] = await db.execute('INSERT INTO types (type) VALUES ( ? )',
                    [this.type]);
                    return result.insertId;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
            }
    static async getTypeByType(type){
        try {
            const [row] = await db.query('SELECT * FROM types where type = ?',[type]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
    }
}