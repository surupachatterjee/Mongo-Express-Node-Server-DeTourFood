var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);


function createUser(user) {
    return userModel.create(user);

}

function updateUserProfile(user, userId) {
    return userModel.update({_id: userId},
        {$set: user})
}

function findAllUsers() {
    return userModel.find({})
        .populate({
            path: 'addresses',
            model: 'AddressModel'
        })
        .populate({
            path: 'restaurants',
            model: 'RestaurantModel',
            populate: {
                path: 'address',
                model: 'AddressModel'
            }
        })
        .populate({
            path: 'reviews',
            model: 'ReviewModel',
            populate: {
                path: 'restaurant',
                model: 'RestaurantModel'
            }
        })
        .exec();
}

function findUserById(userId) {
    return userModel.findOne({_id: userId})
        .populate({
            path: 'addresses',
            model: 'AddressModel'
        })
        .populate({
            path: 'restaurants',
            model: 'RestaurantModel',
            populate: {
                path: 'address',
                model: 'AddressModel'
            }
        })
        .exec();
}


function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials)
        .populate({
            path: 'addresses',
            model: 'AddressModel'
        })
        .populate({
            path: 'restaurants',
            model: 'RestaurantModel',
            populate: {
                path: 'address',
                model: 'AddressModel'
            }
        })
        .exec();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
        .populate({
            path: 'addresses',
            model: 'AddressModel'
        })
        .populate({
            path: 'reviews',
            model: 'ReviewModel',
            populate:{
                path:'restaurant',
                model:'RestaurantModel'
            }
        })
        .populate({
            path: 'restaurants',
            model: 'RestaurantModel',
            populate: {
                path: 'address',
                model: 'AddressModel'
            }
        })
        .exec();
}

function addAddress(userId, addressId) {
    return userModel.update(
        {_id: userId},
        {
            $push: {addresses: addressId}
        })
}


function addReviews(userId,reviewId) {
    return userModel.update(
    {_id: userId},
    {
        $push: {reviews: reviewId}
    })
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    updateUserProfile: updateUserProfile,
    deleteUser: deleteUser,
    findUserById: findUserById,
    addAddress: addAddress,
    addReviews:addReviews

}

module.exports = api;