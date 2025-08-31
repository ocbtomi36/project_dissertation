const db = require('../../database/db');

module.exports = class Car {    

    constructor(vin_number, car_performance, engine_size, licence_plate, technical_validity, manufacturers_idmanufacturer, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel, types_idtype, locations_idlocation ){
        this.vin_number = vin_number,
        this.car_performance = car_performance, 
        this.engine_size = engine_size,
        this.licence_plate = licence_plate, 
        this.technical_validity = technical_validity, 
        this.manufacturers_idmanufacturer = manufacturers_idmanufacturer, 
        this.production_time_idproduction_time = production_time_idproduction_time, 
        this.colors_idcolor = colors_idcolor, 
        this.bodytypes_idbodytype = bodytypes_idbodytype, 
        this.fuels_idfuel = fuels_idfuel, 
        this.types_idtype = types_idtype, 
        this.locations_idlocation = locations_idlocation
    }

    async saveCar(){
        try {
            const [result] = await db.execute('INSERT INTO cars (vin_number, car_performance, engine_size, licence_plate, technical_validity, manufacturers_idmanufacturer, production_time_idproduction_time, colors_idcolor, bodytypes_idbodytype, fuels_idfuel, types_idtype, locations_idlocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [this.vin_number = vin_number,this.car_performance = car_performance, this.engine_size = engine_size, this.licence_plate = licence_plate, this.technical_validity = technical_validity, this.manufacturers_idmanufacturer = manufacturers_idmanufacturer, this.production_time_idproduction_time = production_time_idproduction_time, this.colors_idcolor = colors_idcolor, this.bodytypes_idbodytype = bodytypes_idbodytype, this.fuels_idfuel = fuels_idfuel, this.types_idtype = types_idtype, this.locations_idlocation = locations_idlocation]);
                return result.insertId;
            } catch (error) {
                console.error('There is an error in database:', error);
                throw error;
            }
        }
    }
