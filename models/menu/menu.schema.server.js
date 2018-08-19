const mongoose = require('mongoose');
module.exports = mongoose.Schema({
   name: String,
   cuisineName: String,
   menuType: {
       type: String,
       enum: [
           'BREAKFAST',
           'LUNCH',
           'DINNER'
       ]},
   menuItems: []
}, {collection: 'menu'});
