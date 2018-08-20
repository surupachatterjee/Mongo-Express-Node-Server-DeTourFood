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
        .populate({
            path:'reviews',
            model:'ReviewModel',
            populate:{
                path:'user',
                model:'UserModel'
            }
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
    restaurantModel.findById(restaurantId)
        .populate({
            path:'address',
            model:'AddressModel'})
        .populate({
            path:'users',
            model:'UserModel'
        })
        .populate({
            path:'reviews',
            model:'ReviewModel',
            populate:{
                path:'user',
                model:'UserModel'
            }
        })
        .exec();

updateRestaurant = (restaurantId, newRestaurant) =>
    restaurantModel.findOne({_id: restaurantId}, {
       $set: newRestaurant
    });

deleteRestaurant = (restaurantId) =>
    restaurantModel.remove({_id: restaurantId});

function addReviews(restaurantId,reviewId) {
    return restaurantModel.update(
        {_id: restaurantId},
        {
            $push: {reviews: reviewId}
        })
}

module.exports = {
    createRestaurant,
    findAllRestaurants,
    findRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    addUsers,
    changeRestaurantStatus,
    addReviews
};