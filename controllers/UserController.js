const User = require('../models/User');

module.exports.getUser = function (req, res, next) {
    handleResponse(res, 200, {user: req.user.id});
};

function handleResponse(res, code, body) {
    res.status(code).json(body);
}