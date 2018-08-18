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
    return userModel.findOne(credentials);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername:findUserByUsername

}

module.exports= api;