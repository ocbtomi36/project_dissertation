const db = require('../../database/db');

module.exports = class Car {    

    constructor(vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel,locations_idlocation, manufacturer_type ){
        this.vin_number = vin_number,
        this.car_performance = car_performance, 
        this.engine_size = engine_size,
        this.licence_plate = licence_plate, 
        this.technical_validity = technical_validity, 
        this.production_time_idproduction_time = production_time_idproduction_time, 
        this.colors_idcolor = colors_idcolor, 
        this.bodytypes_idbodytype = bodytypes_idbodytype, 
        this.fuels_idfuel = fuels_idfuel,
        this.locations_idlocation = locations_idlocation, 
        this.manufacturer_type = manufacturer_type 
    }

    async saveCar(){
            try {
                this.licence_plate = this.licence_plate === undefined ? null : this.licence_plate;
                this.technical_validity = this.technical_validity === undefined ? null : this.technical_validity;
                const [ result ] = await db.execute('INSERT INTO cars (vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel, locations_idlocation, manufacturer_type) VALUES (?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?);',[this.vin_number,this.car_performance,this.engine_size,this.licence_plate,this.technical_validity,this.production_time_idproduction_time,this.colors_idcolor,this.bodytypes_idbodytype,this.fuels_idfuel,this.locations_idlocation,this.manufacturer_type]);
                return result.insertId;
            } catch (error) {
                throw error;
            }
    }

    async updateCar(carId){
        try {
            this.licence_plate = this.licence_plate === undefined ? null : this.licence_plate;
            this.technical_validity = this.technical_validity === undefined ? null : this.technical_validity;
            const [result] = await db.execute('UPDATE cars SET vin_number = ? , car_performance = ?, engine_size = ?, licence_plate = ?, technical_validity = ?, production_time_idproduction_time = ?, colors_idcolor = ?, bodytypes_idbodytype = ?, fuels_idfuel = ?, locations_idlocation = ?, manufacturer_type = ? WHERE (idcar = ?);', [this.vin_number,this.car_performance,this.engine_size,this.licence_plate,this.technical_validity,this.production_time_idproduction_time,this.colors_idcolor,this.bodytypes_idbodytype,this.fuels_idfuel,this.locations_idlocation,this.manufacturer_type,carId]);
        } catch (error) {
            throw error;
        }



    }

    static async getCarByVinNumber(vin_number){
            try {
                const [row] = await db.query('SELECT * FROM cars where vin_number = ?',[vin_number]);
                    return row.length > 0 ? row[0] : null;
            } catch (error) {
                console.error('There is an error in database:', error);
                    throw error;
            }
        }
}
