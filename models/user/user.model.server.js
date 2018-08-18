var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);


function createUser(user) {
   return userModel.create(user);

}

function findAllUsers() {
    return userModel.find({});
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials)
        .populate({
            path:'addresses',
            model:'AddressModel'})
        .populate({
            path:'restaurants',
            model:'RestaurantModel',
            populate:{
                path:'address',
                model:'AddressModel'
            }
        })
        .exec();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
        .populate({
            path:'addresses',
            model:'AddressModel'})
        .populate({
            path:'restaurants',
            model:'RestaurantModel',
            populate:{
                path:'address',
                model:'AddressModel'
            }
        })
        .exec();
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername:findUserByUsername

}

module.exports= api;