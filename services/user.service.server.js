module.exports = function (app) {


    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/user/:username', findUserByUsername);

    var userModel = require('../models/user/user.model.server');


    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.params['username'];
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            })
    }


    function login(req, res) {
        // console.log('in login');
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                console.log(user);
                if (user != null) {
                    req.session['currentUser'] = user;
                    res.send(user);
                } else {
                    user = {
                        username: "Invalid credentials"
                    }
                    res.send(user);
                }
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }


    function createUser(req, res) {
        var user = req.body;
        userModel.findUserByUsername(user.username)
            .then(function (respUser) {
                if (respUser !== null) {
                    console.log(respUser.username);
                    res.send({username: "Username Already Exists"});
                }
                else userModel.createUser(user).then(function (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                })
            });


    }

    function profile(req, res) {
        res.send(req.session['currentUser']);

    }
}