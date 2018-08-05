var mongoose = require('mongoose');
var restaurantSchema = mongoose.Schema({
    name :String,
    phone: String,
    cuisineType:String,
    menuItemId: {type: mongoose.Schema.Types.ObjectId, ref:''},
    user : {type: mongoose.Schema.Types.ObjectId, ref:''},
    order: {type: mongoose.Schema.Types.ObjectId, ref:''},
    delivery:{type: mongoose.Schema.Types.ObjectId, ref:''}

}, {collection: 'restaurant'});

module.exports = restaurantSchema;