module.exports = function (app) {


    var restaurantModel = require('../models/restaurant/restaurant.model.server');
    app.post('/api/restaurant', createRestaurant);

    function createRestaurant(req,res) {
        var restaurant = req.body;
        restaurantModel.createRestaurant(restaurant)
            .then(function (restaurant) {
                res.send(restaurant);
            })
    }
    
}