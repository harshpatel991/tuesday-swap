const User = require('../models/User');
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

module.exports.postRegister = function (req, res, next) {
    return authHelpers.createUser(req)
        .then((response) => {
            passport.authenticate('local', (err, user, info) => {
                if (user) { handleResponse(res, 200, 'success'); }
            })(req, res, next);
            return null;
        })
        .catch((err) => { handleResponse(res, 500, err); });
};

module.exports.postLogin = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) { handleResponse(res, 500, 'error'); }
        if (!user) { handleResponse(res, 404, 'User not found'); }
        if (user) {
            req.logIn(user, function (err) {
                if (err) { handleResponse(res, 500, 'error'); }
                handleResponse(res, 200, 'success');
            });
        }
    })(req, res, next);
};

module.exports.getLogout = function (req, res, next) {
    req.logout();
    handleResponse(res, 200, 'success');
};

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}