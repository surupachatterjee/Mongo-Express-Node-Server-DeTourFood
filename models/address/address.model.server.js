var mongoose = require('mongoose');
var addressSchema = require('./address.schema.server');
var addressModel = mongoose.model('AddressModel',addressSchema);

function createAddress(address) {
    return addressModel.create(address);
}

function updateAddress(address,addressId) {
    return addressModel.update({_id:addressId},
        {$set:address})
}


var api = {
    createAddress:createAddress,
    updateAddress:updateAddress
};

module.exports= api;