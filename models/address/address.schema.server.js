var mongoose = require('mongoose');
var addressSchema = mongoose.Schema({
    addressName: String,
    address: String,
    locality: String,
    city: String,
    city_id: String,
    latitude: String,
    longitude: String,
    zipcode: String,
    state: String,
    country: String,
    primaryShipAddr: Boolean,
    billingAddr: Boolean

}, {collection: 'address'});

module.exports = addressSchema;
