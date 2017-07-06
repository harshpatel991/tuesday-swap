const Contest = require('../models/Contest');
const moment = require("moment");

module.exports.postContest = function (req, res) {
    new Contest({
        name: req.body.name,
        description: req.body.description,
        end_at: moment(req.body.end_at)
    })
        .save().then(contest => {
            handleResponse(res, 201, { status: "Success", contest: contest.id})
        })
        .catch(error => {
            handleResponse(res, 500, "Database error")
        });
};

function handleResponse(res, code, body) {
    res.status(code).json(body);
}