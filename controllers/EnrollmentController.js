const Enrollment = require('../models/Enrollment');

module.exports.getEnrollment = function (req, res) {
    Enrollment.where('slug', req.params.enrollmentSlug).fetch()
        .then(function (enrollment) {
            if (enrollment) {
                res.send(enrollment);
            } else {
                //TODO: redirect away
                res.send("bye bye");
            }
        }).catch(function (err) {
        console.error(err);
    });

    //TODO: get codes
    //TODO: get seeking
};

module.exports.postEnrollment = function (req, res) {
    //TODO: do validation
    //TODO: authenticate the user

    new Enrollment({
        slug: 'randomSlug1',
        user_id: 1, //TODO: get from req.body
        contest_id: 1, //TODO: get from req.body
        should_give_away_codes: true //TODO: get from req.body
    })
        .save().then(enrollment => {
        res.send("saved enrollment");
    })
        .catch(error => {
            res.send("failed" + error);
        });

    //TODO: insert codes into database
    //TODO: insert seeking into database
}