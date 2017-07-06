const User = require('../models/User');
const passport = require('../auth/local');
const bcrypt = require('bcryptjs');
const db = require('../database/db.js');

module.exports.postRegister = function (req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return db.knex('users')
        .insert({ email_address: req.body.email_address, password: hash, reddit_username: req.body.reddit_username}).returning('*')
        .then((response) => {
            passport.authenticate('local', (err, user, info) => {
                handleLogin(req, res, err, user, info)
            })(req, res, next);
            return null;
        })
        .catch((err) => { console.log(err); handleResponse(res, 500, err); });
};

module.exports.postLogin = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        handleLogin(req, res, err, user, info)
    })(req, res, next);
};

module.exports.getLogout = function (req, res, next) {
    req.logout();
    handleResponse(res, 200, 'Success');
};

function handleLogin(req, res, err, user, info) {
    if (err) {
        res.status(500).json({ status: 'Error' + err });
    } else if (!user) {
        res.status(404).json({ status : 'User not found' });
    } else {
        req.logIn(user, function (err) { //create the session
            if (err) { handleResponse(res, 500, 'error'); }
            handleResponse(res, 200, 'Success');
        });
    }
}

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}