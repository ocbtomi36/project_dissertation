const db = require('../../database/db');

module.exports = class StreetTypes {

    constructor(street_type) {
        this.street_type = street_type;
    }

    async saveStreetTypes(){
            try {
                const [result] = await db.execute('INSERT INTO street_types (street_type) VALUES (?)',
                [this.street_type]);
                return result.idstreet_type;
            } catch (error) {
                console.error('There is an error in database:', error);
                throw error;
            }
             
    }

}