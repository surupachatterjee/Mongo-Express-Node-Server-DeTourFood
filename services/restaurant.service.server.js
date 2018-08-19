module.exports = app => {

    const restaurantModel = require('../models/restaurant/restaurant.model.server');
    const RESTAURANT_URL ="https://developers.zomato.com/api/v2.1";


    findAllRestaurants = (request, response) => {
        restaurantModel.findAllRestaurants()
            .then(restaurants => response.send(restaurants));
    }

    findRestaurantById = (request, response) => {
        restaurantModel.findRestaurantById(request.params.restaurantId)
            .then(restaurant => response.send(restaurant));
    }

    updateRestaurant = (request, response) => {
        restaurantModel.updateRestaurant(request.params.restaurantId, request.body)
            .then(status => response.send(status));
    }

    deleteRestaurant = (request, response) => {
        restaurantModel.deleteRestaurant(request.params.restaurantId)
            .then(status => response.send(status));
    }

    addMenu = (request, response) => {
        restaurantModel.addMenu(request.params.restaurantId, request.params.menuId)
            .then(
                status => response.send(status),
                error => response.send(error)
            )
    }

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


    var userModel = require('../models/user/user.model.server');
    var addressModel = require('../models/address/address.model.server');
    app.post('/api/restaurant', createRestaurant);
    app.get('/api/restaurant', findAllRestaurants);
    app.get('/api/restaurant/:restaurantId', findRestaurantById);
    app.put('/api/restaurant/:restaurantId', updateRestaurant);
    app.delete('/api/restaurant/:restaurantId', deleteRestaurant);
    app.put('/api/restaurant/:restaurantId/menu/:menuId', addMenu);


    
}