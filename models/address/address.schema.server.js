var mongoose = require('mongoose');
var addressSchema = mongoose.Schema({
    addressName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    primaryShipAddr: Boolean,
    billingAddr: Boolean

}, {collection: 'address'});

module.exports = addressSchema;
