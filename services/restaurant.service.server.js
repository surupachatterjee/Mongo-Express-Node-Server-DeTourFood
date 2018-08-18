module.exports = function (app) {


    var restaurantModel = require('../models/restaurant/restaurant.model.server');
    var userModel = require('../models/user/user.model.server');
    var addressModel = require('../models/address/address.model.server');
    app.post('/api/restaurant', createRestaurant);

    function createRestaurant(req,res) {
        var restaurantUser = req.body;

        userModel.findUserByUsername(restaurantUser.username)
            .then(function (user){
                if (user !== null)
                    res.send({username:'Username Already Exists'})
                else {
                    addressModel.createAddress(restaurantUser.addresses[0])
                        .then(function(addr){
                            restaurantModel.createRestaurant({
                                name: restaurantUser.addresses[0].addressName,
                                address : addr._id,
                                phone:restaurantUser.phone,
                                email:restaurantUser.email,
                                creationDate: restaurantUser.creationDate,
                                restStatus:restaurantUser.userStatus,
                                zomatoRest:restaurantUser.zomatoRest
                            }).then(function(restrnt){
                                userModel.createUser({
                                    username: restaurantUser.username,
                                    password: restaurantUser.password,
                                    userStatus:restaurantUser.userStatus,
                                    role: restaurantUser.role,
                                    restaurantRole:restaurantUser.restaurantRole,
                                    creationDate:restaurantUser.creationDate,
                                    email: restaurantUser.email,
                                    phone: restaurantUser.phone,
                                    restaurants: [restrnt._id],
                                    addresses: [addr._id]
                                }).then(function(createdUser) {
                                    restaurantModel.addUsers(restrnt._id,createdUser._id)
                                    userModel.findUserByUsername(createdUser.username)
                                        .then(user => res.json(user));

                                })
                            })
                        })
                }
            })
    }
    
}