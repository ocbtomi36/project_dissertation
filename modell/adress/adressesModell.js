const db = require('../../database/db');

module.exports = class Addresses {
    constructor(postal_code,street_name,house_number) {
        this.postal_code = postal_code,
        this.street_name = street_name,
        this.house_number = house_number
    }
}