const Enrollment = require("../models/Enrollment");

function validatePostEnrollment (req, res, next) {
    req.checkBody('contest_id', 'Contest Id cannot be empty').notEmpty();
    req.checkBody('contest_id', 'Contest Id cannot be an integer').isInt();
    req.checkBody('should_give_away_codes', 'Should Give Away Codes cannot be empty').notEmpty();
    req.checkBody('should_give_away_codes', 'Should Give Away Codes should be a boolean').isBoolean();

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            message: 'Validation failed',
            failures: errors
        });
    } else {
        //Verify not already enrolled in the contest
        Enrollment.where({user_id: req.user.id, contest_id: req.body.contest_id}).count("*")
            .then((count) => {
                if (count >= 1) {
                    return res.status(409).json({
                        message: 'Validation failed',
                        failures: ["Already enrolled in this contest"]
                    });
                }
                return next();
            })
            .catch((err) => {
                return res.status(500).json({status: "Database Error " + err});
            });
    }
}

module.exports = {
    validatePostEnrollment
};