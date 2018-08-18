module.exports = app => {

    const restaurantModel = require('../models/restaurant/restaurant.model.server');
    const RESTAURANT_URL ="https://developers.zomato.com/api/v2.1";

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

    addMenu = (request, response) => {
        restaurantModel.addMenu(request.params.restaurantId, request.params.menuId)
            .then(
                status => response.send(status),
                error => response.send(error)
            )
    }

    export const findLocationDetailsByCity = (dispatch,cityName) => {
        fetch(RESTAURANT_URL + "/locations?query=" + cityName,{
            headers:{

                'Accept': 'application/json',
                'user-key': '8f387705dbb342d6fe530909e541b0dd'//key value here
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            let fetchedLoc = response.location_suggestions[0];
            console.log(fetchedLoc);
            return fetch(RESTAURANT_URL + "/search?q="+cityName
                +"&lat="+fetchedLoc.latitude
                +"&lon="+fetchedLoc.longitude
                +"&entity_id="+fetchedLoc.entity_id
                +"&sort=rating"
                +"&count=150",{
                headers:{
                    'Accept': 'application/json',
                    'user-key': '8f387705dbb342d6fe530909e541b0dd'//key value here
                }
            })
        }).then(function (response) {
            return response.json();
        }).then(searchResults => {
            return searchResults.restaurants;
        }).then(restaurants => {
            dispatch({
                type: constants.FIND_LOCATION_DETAILS_BY_CITY,
                restaurants: restaurants
                /*RestaurantService
                //.instance
                .findAllRestaurants(city)
                /!*.then(restaurants => {
                  if (restaurants) {
                      return restaurants;
                  }
                  return [];
                })*!/*/
            });
        })

    }


    app.post('/api/restaurant', createRestaurant);
    app.get('/api/restaurant', findAllRestaurants);
    app.get('/api/restaurant/:restaurantId', findRestaurantById);
    app.put('/api/restaurant/:restaurantId', updateRestaurant);
    app.delete('/api/restaurant/:restaurantId', deleteRestaurant);
    app.put('/api/restaurant/:restaurantId/menu/:menuId', addMenu);
}