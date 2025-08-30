const db = require('../../database/db');

module.exports = class Color {

    constructor(color){
        this.color = color
    }

    async saveColor(){
            try {
                const [result] = await db.execute('INSERT INTO colors (color) VALUES ( ? )',
                    [this.color]);
                    return result.insertId;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
            }
    static async getColorByColor(color){
        try {
            const [row] = await db.query('SELECT * FROM colors where color = ?',[color]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
        }
}