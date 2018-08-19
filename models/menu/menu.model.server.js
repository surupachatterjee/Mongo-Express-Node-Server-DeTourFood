const mongoose = require('mongoose');
var menuSchema = require('./menu.schema.server');
var menuModel = mongoose.model('MenuModel',menuSchema);

createMenu = menu =>
    menuModel.create(menu);

findAllMenus = () =>
    menuModel.find();

findMenuById = menuId =>
    menuModel.findById(menuId);

updateMenu = (menuId, newMenu) =>
    menuModel.update({_id: menuId}, {
        $set: newMenu
    });

deleteMenu = (menuId) =>
    menuModel.remove({_id: menuId});

module.exports = {
    createMenu, findAllMenus, findMenuById,
    updateMenu, deleteMenu
};