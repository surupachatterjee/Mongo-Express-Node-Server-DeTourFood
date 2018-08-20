const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    orderId: Number,
    status: String,
    totalPrice: Number,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    orderItems: [{
        restaurant: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RestaurantModel'
        }],
        menuItem: String,
        menuItemPrice: String
    }]
}, {collection: 'orders'});