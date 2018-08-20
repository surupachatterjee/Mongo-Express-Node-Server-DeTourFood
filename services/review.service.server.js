module.exports = function (app) {

    //app.get('/api/review', findAllReviews);
    app.post('/api/review', createReview);
    const reviewModel = require('../models/review/review.model.server');
    const userModel = require('../models/user/user.model.server');
    const restaurantModel = require('../models/restaurant/restaurant.model.server');

    function createReview(req,res) {
        var review = req.body;
        console.log("REview received  :" + review);
        reviewModel.createReview(review)
                    .then(function (preview) {
                userModel.addReviews(review.user,preview._id)
                    .then(function (response) {
                        restaurantModel.addReviews(review.restaurant,preview._id)
                            .then(function (restaurant) {
                                res.json(preview);
                            })
                    })
            })
    }


}