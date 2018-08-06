
var mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('RestaurantModel',restaurantSchema);

function createRestaurant(restaurant) {
    return restaurantModel.create(restaurant);
}

var api ={
    createRestaurant:createRestaurant
}

module.exports = api;