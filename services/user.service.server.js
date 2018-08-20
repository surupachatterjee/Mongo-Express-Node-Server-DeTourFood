module.exports = function (app) {


    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/user/:username', findUserByUsername);
    app.put('/api/user/:userId', updateUserProfile);
    app.delete('/api/user/:userId', deleteUser);
    app.put('/api/user/address/:addressId', updateUserAddress);
    app.post('/api/admin/user', createUserFromAdmin)
    app.post('/api/user/:userId/address',createUserAddress);
    app.get('/api/user/:userId', findUserById);

    var userModel = require('../models/user/user.model.server');
    const addressModel = require('../models/address/address.model.server');

    function createUserAddress(req,res){
        var userId = req.params['userId'];
        addressModel.createAddress(req.body)
            .then(function (address) {
                userModel.addAddress(userId,address._id)
                    .then(function (user) {
                        res.json(user);
                });
            })
    }

    function updateUserAddress(req, res) {
        var addressId = req.params['addressId'];
        var addr = req.body;
        var userId = req.session['currentUser']._id;
        console.log("inside update address" + addressId + " : " + userId);
        addressModel.updateAddress(addr, addressId)
            .then(function (response) {
                console.log(response);
                return userModel.findUserById(userId)
                    .then(function (user) {
                        return res.json(user);
                    })
            })
    }

    function updateUserProfile(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        userModel.updateUserProfile(user, userId)
            .then(function (user) {
                userModel.findUserById(userId)
                    .then(user => res.json(user));
            })
    }

    function findUserById(req,res) {
        var userId = req.params['userId'];
        console.log(userId);
        userModel.findUserById(userId)
            .then(user => res.json(user));
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
        console.log(userId);
        userModel.deleteUser(userId)
            .then(function (status) {
                res.send(status);
            })
    }


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

    function createUserFromAdmin(req, res) {
        var user = req.body;
        userModel.findUserByUsername(user.username)
            .then(function (respUser) {
                if (respUser !== null) {
                    console.log(respUser.username);
                    res.send([{username: "Username Already Exists"}]);
                }
                else userModel.createUser(user)
                    .then(function (user){
                        userModel.findAllUsers()
                            .then(function (users) {
                                res.json(users)
                            });
                    })
            });
    }



    function profile(req, res) {
        res.send(req.session['currentUser']);

    }
}