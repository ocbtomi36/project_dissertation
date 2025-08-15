const db = require('../database/db');

module.exports = class User {
    constructor( given_name, family_name,pin_number, user_role, email, password) {
        
        this.given_name = given_name, 
        this.family_name = family_name, 
        this.pin_number = pin_number, 
        this.user_role = user_role, 
        this.email = email,
        this.password = password
    }  
    async save(){
        try {
            const [result] = await db.execute('INSERT INTO users (given_name, family_name, pin_number, user_role, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [this.given_name,this.family_name,this.pin_number,this.user_role,this.email,this.password]);
            return result.iduser;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
         
    }   
    /** 
     * Addition queries for validation of pin_number and email
    */
    /**
     * Validate pinNumber, if exists
     */
    static async PinNumberExistsByIncommingData(pinNumber) {
        try {
            const [row] = await db.query(
            'SELECT iduser FROM users WHERE pin_number = ? LIMIT 1',
            [pinNumber]
        );
            return row.length > 0;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }
    /**
     * Validate e-mail, if exists
     */
    static async EmailExistsByIncommingData(eMail) {
        try {
            const [row] = await db.query(
            'SELECT email FROM users WHERE email = ? LIMIT 1',
            [eMail]
        );
            return row.length > 0;
        } catch (error) {
            console.error('There is an error in database:', error);
            throw error;
        }
    }

};