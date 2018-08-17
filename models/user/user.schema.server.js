var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role:String,
    email:String,
    phone:String,
    dateOfBirth:Date,
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref:'RestaurantModel'},
    address: {type: mongoose.Schema.Types.ObjectId, ref:'AddressModel'},
    order : {type: mongoose.Schema.Types.ObjectId, ref:''},
    review :{type: mongoose.Schema.Types.ObjectId, ref:''}


},{collection: 'user'});

module.exports = userSchema;
