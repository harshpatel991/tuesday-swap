const bcrypt = require('bcryptjs');
const db = require('../database/db');
const User = require('../models/User');

function comparePass(userPassword, databasePassword) {
    const comparePassResults = bcrypt.compareSync(userPassword, databasePassword);
    return comparePassResults;
}

function createUser (req) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return db.knex('users')
        .insert({
            email_address: req.body.email_address,
            password: hash,
            reddit_username: req.body.reddit_username
        }).returning('*');
}

function loginRequired(req, res, next) {
    if (!req.user) return res.status(401).json({status: 'Please log in'});
    return next();
}

function adminRequired(req, res, next) {
    if (!req.user) return res.status(401).json({status: 'Please log in'});
    return User.where('email_address', req.user.username).fetch()
        .then((user) => {
            if (!user.get('admin')) return res.status(401).json({status: 'Not an admin'});
            next();
        })
        .catch((err) => { res.status(404).json({status: 'User not found'}); });
}

function loginRedirect(req, res, next) {
    if (req.user) return res.status(401).json(
        {status: 'You are already logged in'});
    return next();
}

module.exports = {
    comparePass,
    createUser,
    loginRequired,
    adminRequired,
    loginRedirect
};