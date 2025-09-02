const db = require('../../database/db');

module.exports = class Location {    

    constructor(location_name, phone_number,addresses_idaddress){
        this.location_name = location_name,
        this.phone_number = phone_number, 
        this.addresses_idaddress = addresses_idaddress
    }

    async saveLocation(){
        try {
            const [result] = await db.execute('INSERT INTO locations (location_name, phone_number, addresses_idaddress) VALUES (?, ?, ?)',
                [this.location_name, this.phone_number, this.addresses_idaddress]);
                return result.insertId;
            } catch (error) {
                console.error('There is an error in database:', error);
                throw error;
            }
        }
    
    async updateLocation(idlocation){
        try{
            const [result] = await db.execute('UPDATE locations SET location_name = ?, phone_number = ?, addresses_idaddress = ? WHERE (idlocation = ?);',
                [this.location_name, this.phone_number, this.addresses_idaddress,idlocation]);
                return result.insertId;
        } catch(error){
            console.error('There is an error in database:', error);
                throw error;
        }
    }  
    
    static async getOneLocationDataById(idlocation){
        try {
            const [row] = await db.query('SELECT locations.idlocation, locations.location_name, locations.phone_number, addresses.postal_code, locality_names.locality_name, addresses.street_name, street_types.street_type ,addresses.house_number FROM finaldbrentcar.locations INNER JOIN addresses ON locations.addresses_idaddress = addresses.idaddress INNER JOIN locality_names ON addresses.locality_names_idlocality_name = locality_names.idlocality_name INNER JOIN street_types ON addresses.street_types_idstreet_type = street_types.idstreet_type where idlocation = ?;',[idlocation]);    
            return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }

    static async getLocationByLocationName(location_name){
        try {
            const [row] = await db.query('SELECT * FROM locations where location_name = ?',[location_name]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
        }
    static async getPhoneNumByPhoneNum(phone_number){
        try {
            const [row] = await db.query('SELECT * FROM locations where phone_number = ?',[phone_number]);
                return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
                throw error;
            }
        }
}