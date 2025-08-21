const db = require('../../database/db');

module.exports = class Address {
    constructor(postal_code,street_name,house_number,locality_names_idlocality_name,street_types_idstreet_type) {
        this.postal_code = postal_code,
        this.street_name = street_name,
        this.house_number = house_number
        this.locality_names_idlocality_name = locality_names_idlocality_name,
        this.street_types_idstreet_type = street_types_idstreet_type
    }

    async saveAddresses(){
                try {
                    const [result] = await db.execute('INSERT INTO `finaldbrentcar`.`addresses` (`postal_code`, `street_name`, `house_number`, `locality_names_idlocality_name`, `street_types_idstreet_type`) VALUES (?, ?, ?, ?, ?);',
                    [this.postal_code,this.street_name,this.house_number,this.locality_names_idlocality_name,this.street_types_idstreet_type,]);
                    return result.insertId;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
                 
        }
    
     async getAdresses(){
            try {
                const [row] = await db.query('SELECT * FROM addresses where postal_code = ? and street_name = ? and house_number = ? and locality_names_idlocality_name = ? and street_types_idstreet_type = ?',
                    [this.postal_code,this.street_name,this.house_number,this.locality_names_idlocality_name,this.street_types_idstreet_type]);
                    return row.length > 0 ? row[0] : null;
                } catch (error) {
                    console.error('There is an error in database:', error);
                    throw error;
                }
        }
}