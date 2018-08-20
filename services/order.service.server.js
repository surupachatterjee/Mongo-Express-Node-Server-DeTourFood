module.exports = app => {

    const orderModel = require('../models/order/order.model.server');

    createOrder = (request, response) => {
        orderModel.createOrder(request.body)
            .then(order => response.send(order));
    }

    findAllOrders = (request, response) => {
        orderModel.findAllOrders(request.body)
            .then(orders => response.send(orders));
    }

    findOrderById = (request, response) => {
        orderModel.findOrderById(request.params.orderId)
            .then(order => response.send(order));
    }

    updateOrder = (request, response) => {
        if(request.body._id){
            orderModel.updateOrder(request.body._id, request.body)
                .then(() => orderModel.findOrderById(request.body._id))
                .then(order => response.send(order));
        } else {
            orderModel.createOrder(request.body)
                .then(order => response.send(order));
        }
    }

    deleteOrder = (request, response) => {
        orderModel.deleteOrder(request.params.orderId)
            .then(status => response.send(status));
    }

    app.post('/api/order', createOrder);
    app.get('/api/order', findAllOrders);
    app.get('/api/order/:orderId', findOrderById);
    app.put('/api/order', updateOrder);
    app.delete('/api/order/:orderId', deleteOrder);
}