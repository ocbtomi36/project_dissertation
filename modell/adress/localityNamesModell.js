const db = require('../../database/db');

module.exports = class LocalityNames {

    constructor(locality_name) {
        this.locality_name = locality_name;
    }

    async saveLocalityNames(){
        try {
            const [result] = await db.execute('INSERT INTO locality_names (locality_name) VALUES (?)',
                [this.locality_name]);
                return result.idlocality_name;
            } catch (error) {
                console.error('There is an error in database:', error);
                throw error;
            }
                 
    }
}