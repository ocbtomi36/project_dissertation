const db = require('../../database/db');

module.exports = class Location {    

    constructor(location_name, phone_number, addresses_idaddress){
        this.location_name = location_name,
        this.phone_number = phone_number, 
        this.addresses_idaddress = addresses_idaddress
    }

    async saveLocation(){
        try {
            const [result] = await db.execute('INSERT INTO locations (location_name, phone_number, addresses_idaddress) VALUES (?, ?, ?)',
                [this.location_name = this.location_name, this.phone_number = this.phone_number, this.addresses_idaddress = this.addresses_idaddress]);
                return result.insertId;
            } catch (error) {
                console.error('There is an error in database:', error);
                throw error;
            }
        }
    static async getLocationByLocationName(location_name){
        try {
            const [row] = await db.query('SELECT * FROM location where location_name = ?',[location_name]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
        }
}