const mongoose = require('mongoose');
module.exports = mongoose.Schema({
   name: String,
   cuisineName: String,
   menuItems: String
}, {collection: 'menu'});

