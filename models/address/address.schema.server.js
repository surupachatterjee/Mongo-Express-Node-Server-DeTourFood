var mongoose = require('mongoose');
var addressSchema = mongoose.Schema({
        addressName:String,
        addressLine1: String,
        addressLine2:String,
        city : String,
        state:String,
        zip : String,
        primaryShipAddr:Boolean,
        billingAddr:Boolean,
        user: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},

},{collection: 'address'});

module.exports = addressSchema;
