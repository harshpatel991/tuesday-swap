const User = require('../models/User');

module.exports.getUser = function (req, res) {
    User.where('id', req.params.userId).fetch()
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                //TODO: redirect away
                res.send("bye bye");
            }
        }).catch(function (err) {
        console.error(err);
    });
};

module.exports.postUser = function (req, res) {
    //TODO: check if not logged in
    //TODO: validation

    new User({
        email_address: 'ipod998@gmail.com',
        password: "123456", //TODO: get from req.body
        reddit_username: "deadfire55", //TODO: get from req.body
        is_reddit_verified: true //TODO: get from somewhere
    })
        .save().then(user => {
        res.send("saved user");
    })
        .catch(error => {
            res.send("failed user" + error);
        });

};