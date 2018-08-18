
var mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('RestaurantModel',restaurantSchema);

function createRestaurant(restaurant) {
    return restaurantModel.create(restaurant);
}


function addUsers(restaurantId,userId){
    return restaurantModel.update({_id:restaurantId},{
        $push:{users:userId}
    })
}

var api ={
    createRestaurant:createRestaurant,
    addUsers:addUsers
}

module.exports = api;