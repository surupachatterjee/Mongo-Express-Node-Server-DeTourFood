var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    userStatus: {
        type: String,
        enum: [
            'ACTIVE',
            'INACTIVE',
            'PENDING_APPROVAL']
    },
    role: {
        type: String,
        enum: [
            'ADMIN',
            'CUSTOMER',
            'RESTAURANT',
            'DELIVERY'
        ]
    },
    restaurantRole:{
        type:String,
        enum: [
            'MANAGER',
            'CHEF'
        ]
    },
    creationDate:Date,
    endDate:Date,
    email: String,
    phone: String,
    dateOfBirth: Date,
    addresses: [{type: mongoose.Schema.Types.ObjectId, ref: 'AddressModel'}],
    restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: ''}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: ''}]


}, {collection: 'user'});

module.exports = userSchema;
