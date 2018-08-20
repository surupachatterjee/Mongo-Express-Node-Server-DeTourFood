var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel',reviewSchema);

function createReview(review) {
   return reviewModel.create(review);
}

function fetchAllReviews() {
    return reviewModel.find();
}

var api = {
    createReview:createReview,
    fetchAllReviews:fetchAllReviews
}

module.exports= api;