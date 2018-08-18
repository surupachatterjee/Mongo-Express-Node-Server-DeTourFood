const mongoose = require('mongoose');
module.exports = mongoose.Schema({
   name: String,
   zipcode: Number,
   cuisines: [String],
   featured_image: String,
   menus: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'MenuModel'
   }],
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