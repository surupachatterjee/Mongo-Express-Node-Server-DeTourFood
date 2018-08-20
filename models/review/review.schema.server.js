var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RestaurantModel'
    },
    overAllRating:Number,
    foodRating:Number,
    ambRating:Number,
    serviceRating:Number,
    userReview:String

}, {collection:'review'});

module.exports = reviewSchema;
