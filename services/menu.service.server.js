module.exports = app => {

    const menuModel = require('../models/menu/menu.model.server');

    createMenu = (request, response) => {
        menuModel.createMenu(request.body)
            .then(menu => response.send(menu));
    }

    findAllMenus = (request, response) => {
        menuModel.findAllMenus(request.body)
            .then(menus => response.send(menus));
    }

    findMenuById = (request, response) => {
        menuModel.findMenuById(request.params.menuId)
            .then(menu => response.send(menu));
    }

    updateMenu = (request, response) => {
        menuModel.updateMenu(request.params.menuId, request.body)
            .then(status => response.send(status));
    }

    deleteMenu = (request, response) => {
        menuModel.deleteMenu(request.params.menuId)
            .then(status => response.send(status));
    }

    app.post('/api/menu', createMenu);
    app.get('/api/menu', findAllMenus);
    app.get('/api/menu/:menuId', findMenuById);
    app.put('/api/menu/:menuId', updateMenu);
    app.delete('/api/menu/:menuId', deleteMenu);
}