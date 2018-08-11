const mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('RestaurantModel',restaurantSchema);

createRestaurant = restaurant =>
    restaurantModel.create(restaurant);

findAllRestaurants = () =>
    restaurantModel.find();

findRestaurantById = restaurantId =>
    restaurantModel.findById(restaurantId);

updateRestaurant = (restaurantId, newRestaurant) =>
    restaurantModel.update({_id: restaurantId}, {
       $set: newRestaurant
    });

deleteRestaurant = (restaurantId) =>
    restaurantModel.remove({_id: restaurantId});

module.exports = {
    createRestaurant, findAllRestaurants, findRestaurantById,
    updateRestaurant, deleteRestaurant
};