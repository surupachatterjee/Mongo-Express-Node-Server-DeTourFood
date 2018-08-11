module.exports = app => {

    app.post('api/restaurant', createRestaurant);
    app.get('api/restaurant', findAllRestaurants);
    app.get('api/restaurant/:restaurantId', findRestaurantById);
    app.put('api/restaurant/:restaurantId', updateRestaurant);
    app.delete('api/restaurant/:restaurantId', deleteRestaurant);

    const restaurantModel = require('../models/restaurant/restaurant.model.server');

    createRestaurant = (request, response) => {
        restaurantModel.createRestaurant(request.body)
            .then(restaurant => response.send(restaurant));
    }

    findAllRestaurants = (request, response) => {
        restaurantModel.findAllRestaurants(request.body)
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
}