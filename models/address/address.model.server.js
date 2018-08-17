var mongoose = require('mongoose');
var addressSchema = require('./address.schema.server');
var addressModel = mongoose.model('AddressModel',addressSchema);

function createAddress(address) {
    return addressModel.create(address);
}


var api = {
    createAddress:createAddress
};

module.exports= api;