const User = require('../models/User');

function loginRequired(req, res, next) {
    if (!req.user) {
        return res.status(401).json({status: 'Please log in'});
    }
    return next();
}

function adminRequired(req, res, next) {
    if (!req.user || !req.user.get("admin")) {
        return res.status(401).json({status: 'Not an admin'});
    }
    next();
}

function loginRedirect(req, res, next) {
    if (req.user) return res.status(401).json({status: 'You are already logged in'});
    return next();
}

module.exports = {
    loginRequired,
    adminRequired,
    loginRedirect
};