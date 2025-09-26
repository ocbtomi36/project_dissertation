const db = require('../../database/db');

module.exports = class User {
    constructor( given_name, family_name,pin_number, user_role, email, password,addresses_idaddress) {
        
        this.given_name = given_name, 
        this.family_name = family_name, 
        this.pin_number = pin_number, 
        this.user_role = user_role, 
        this.email = email,
        this.password = password,
        this.addresses_idaddress = addresses_idaddress
    }  
    async save(){
        try {
            const [result] = await db.execute('INSERT INTO users (given_name, family_name, pin_number, user_role, email, password, addresses_idaddress) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.given_name,this.family_name,this.pin_number,this.user_role,this.email,this.password,this.addresses_idaddress]);
            return result.insertId;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
         
    }   

    static async getAllUserData(){
        try {
            const [row] = await db.query('SELECT users.iduser, users.given_name, users.family_name, users.pin_number, addresses.postal_code, locality_names.locality_name, addresses.street_name,street_types.street_type,addresses.house_number FROM users INNER JOIN addresses ON users.addresses_idaddress = addresses.idaddress INNER JOIN locality_names ON addresses.locality_names_idlocality_name = locality_names.idlocality_name INNER JOIN street_types ON addresses.street_types_idstreet_type = street_types.idstreet_type');
            return row.length > 0 ? row : null;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }

    static async getOneUserDataById(iduser){
        try {
            const [row] = await db.query('SELECT users.iduser, users.given_name, users.family_name, users.pin_number, addresses.postal_code, locality_names.locality_name, addresses.street_name,street_types.street_type,addresses.house_number FROM users INNER JOIN addresses ON users.addresses_idaddress = addresses.idaddress INNER JOIN locality_names ON addresses.locality_names_idlocality_name = locality_names.idlocality_name INNER JOIN street_types ON addresses.street_types_idstreet_type = street_types.idstreet_type where users.iduser = ?', [iduser]);
            
            return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }
    async updateUserData(iduser) {
        try {
            const [ result ] = await db.execute('UPDATE users SET given_name = ?, family_name = ?,pin_number = ?,email = ?,user_role = ?,password = ?, addresses_idaddress = ?  WHERE (iduser = ?)',[this.given_name,this.family_name,this.pin_number,this.email,this.user_role,this.password,this.addresses_idaddress,iduser]);
            return result.insertId;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }
    static async softDeleteUser(iduser) {
        try {
            const [ result ] = await db.execute('UPDATE users SET is_employed = ? WHERE (iduser = ?);',['no',iduser]);
            return result.insertId;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }
    static async reActivateUser(iduser) {
        try {
            const [ result ] = await db.execute('UPDATE users SET is_employed = ? WHERE (iduser = ?);',['yes',iduser]);
            return result.insertId;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }

    /**
     * Check pin number
     */
    static async GetsIdUserByIncommingPinNumber(pinNumber) {
        try {
            const [row] = await db.query(
            'SELECT iduser FROM users WHERE pin_number = ? LIMIT 1',
            [pinNumber]
        );
            return row.length > 0 ? row[0].iduser : null;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }
    /**
     * Check e-mail
     */
    static async GetsIdUserByIncommingEmail(eMail) {
        try {
            const [row] = await db.query(
            'SELECT iduser FROM users WHERE email = ? LIMIT 1',
            [eMail]
        );
            return row.length > 0 ? row[0].iduser : null;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }
    /**
     *  Gets user password by incomming email
     */
    static async GetUserByIncommingEmail(eMail) {
        try {
            const [row] = await db.query(
            'SELECT * FROM users WHERE email = ? ',
            [eMail]
        );
            return row.length > 0 ? row[0] : null;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }

};