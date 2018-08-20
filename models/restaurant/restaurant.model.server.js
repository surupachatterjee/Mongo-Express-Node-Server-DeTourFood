const mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('RestaurantModel',restaurantSchema);

createRestaurant = restaurant =>
    restaurantModel.create(restaurant);


changeRestaurantStatus = (restId,restStatus) =>
    restaurantModel.update({_id : restId},{
        $set:{restStatus:restStatus}
    })

findAllRestaurants = () =>
    restaurantModel.find()
        .populate({
            path:'address',
            model:'AddressModel'})
        .populate({
            path:'users',
            model:'UserModel'
        })
        .exec();


addUsers = (restaurantId,userId) => {
    console.log(restaurantId + " " + userId);
    return restaurantModel.update(
        {_id: restaurantId},
        {
            $push: {users: userId}
        })
};


findRestaurantById = restaurantId =>
    restaurantModel.findById(restaurantId);

updateRestaurant = (restaurantId, newRestaurant) =>
    restaurantModel.findOne({_id: restaurantId}, {
       $set: newRestaurant
    });

deleteRestaurant = (restaurantId) =>
    restaurantModel.remove({_id: restaurantId});

module.exports = {
    createRestaurant,
    findAllRestaurants,
    findRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    addUsers,
    changeRestaurantStatus
};