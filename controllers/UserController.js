const User = require('../models/User');

module.exports.postVerifyRedditUsername = function (req, res, next) {
    User.where('id', req.user.id).fetch()
        .then(user => {
            // TODO: generate OAuth request

            // TODO: return url response

            // user will login to reddit
        })
        .catch(err => {

        });

};

module.exports.getUser = function (req, res, next) {
    handleResponse(res, 200, {user: req.user.id});
};

function handleResponse(res, code, body) {
    res.status(code).json(body);
}