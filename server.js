var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost/DeTourFood');

mongoose.connect('mongodb://detourfood:DetourFood2018@ds247852.mlab.com:47852/detourfood',
    { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://detour-food.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


console.log("Server Started");


var menuService = require('./services/menu.service.server');
menuService(app);

var orderService = require('./services/order.service.server');
orderService(app);


var restaurantService = require('./services/restaurant.service.server');
restaurantService(app);

var userService = require('./services/user.service.server');
userService(app);

var reviewService = require('./services/review.service.server');
reviewService(app);


app.listen(process.env.PORT || 4000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
