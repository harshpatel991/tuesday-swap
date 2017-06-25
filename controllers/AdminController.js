const User = require('../models/User');

module.exports.getAdmin = function (req, res, next) {
    handleResponse(res, 200, 'success');
};

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}