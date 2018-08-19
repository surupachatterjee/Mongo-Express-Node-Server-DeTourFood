const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    name: String,
    zomatoRest : Object,
    address : {type: mongoose.Schema.Types.ObjectId,
        ref: 'AddressModel'},
    zipcode: String,
    phone:String,
    email:String,
    creationDate:Date,
    endDate:Date,
    restStatus:String,
    cuisines: [String],
    featured_image: String,
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuModel'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderModel'
    }],
    deliveries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryModel'
    }]
}, {collection: 'restaurants'});
