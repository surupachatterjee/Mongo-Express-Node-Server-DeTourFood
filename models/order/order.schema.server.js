const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    orderId: Number,
    status: {
        type: String,
        enum: [
            'INCOMPLETE',
            'COMPLETED'
        ]
    },
    totalPrice: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    orderItems: [{
        menuItemId: String,
        restaurantId: String,
        menuItem: String,
        menuItemPrice: String,
        menuItemStatus: {
            type: String,
            enum: [
                'DELIVERED',
                'NOT DELIVERED'
            ]
        }
    }]
}, {collection: 'orders'});