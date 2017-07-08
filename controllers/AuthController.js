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
        .catch((err) => {
            handleResponse(res, 500, "Database error");
        });
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
        handleResponse(res, 500, 'Error');
    } else if (!user) {
        handleResponse(res, 404, 'User not found');
    } else {
        req.logIn(user, function (err) { //create the session
            if (err) {
                handleResponse(res, 500, 'Error');
            }
            handleResponse(res, 200, 'Success Login');
        });
    }
}

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}