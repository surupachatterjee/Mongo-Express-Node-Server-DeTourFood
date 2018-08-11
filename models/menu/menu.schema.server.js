const mongoose = require('mongoose');
module.exports = mongoose.Schema({
   menuId: Number,
   name: String,
   cuisineName: String,
   category: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'MenuTypeModel'
   }]
}, {collection: menu});