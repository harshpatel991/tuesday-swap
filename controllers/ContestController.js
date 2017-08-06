const Contest = require('../models/Contest');
const moment = require("moment");
const slug = require('slug');

slug.defaults.mode ='rfc3986';

module.exports.getContest =  function (req, res) {
    Contest.where('id', req.params.contestId).fetch({ required: true,
        withRelated: [
            {'codeTypes': function (qb) {
                qb.select('code_types.id', 'code_types.contest_id','code_types.name', 'code_types.image');
            }},
            {'enrollments': function(qb) {
                qb.select('id', 'slug', 'user_id', 'contest_id');
            }},
            {'enrollments.codes': function(qb) {
                qb.select('codes.id', 'codes.enrollment_id', 'codes.code_type_id', 'codes.taken'); //TODO: account for taken
            }},
            {'enrollments.codes.codeType': function (qb) {
                qb.select('code_types.id', 'code_types.name', 'code_types.image')
            }},
            {'enrollments.user': function(qb) {
                qb.select('users.id', 'users.reddit_username');
            }},
            {'enrollments.seekings': function(qb){
               qb.select('seekings.id', 'seekings.enrollment_id', 'seekings.code_type_id')
            }},
            {'enrollments.seekings.codeType': function (qb) {
                qb.select('code_types.id', 'code_types.name', 'code_types.image')
            }},
        ]})
        .then(function (contest) {
            res.send(contest.toJSON());
        })
        .catch(function (err) {
            res.status(500).json({status: "Database Error " + err});
        });
};

module.exports.postContest = function (req, res) {
    new Contest({
        slug: slug(req.body.name),
        name: req.body.name,
        description: req.body.description,
        end_at: moment(req.body.end_at)
    })
        .save().then(contest => {
            handleResponse(res, 201, { status: "Success", contestId: contest.id})
        })
        .catch(error => {
            handleResponse(res, 500, "Database error")
        });
};

function handleResponse(res, code, body) {
    res.status(code).json(body);
}