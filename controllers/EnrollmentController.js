const Enrollment = require('../models/Enrollment');
const Code = require('../models/Code');
const randomLorem = require('random-lorem');
const knex = require('../database/db').knex;

module.exports.getEnrollment = function (req, res) {
    Enrollment.where('slug', req.params.enrollmentSlug).fetch({ required: true, withRelated: ['codes', 'seekings'] })
        .then(function (enrollment) {
            res.send(enrollment);
        })
        .catch(function (err) {
            res.status(500).json({status: "Database Error" + err});
        });
};

function formatCodesToInsert(enrollmentId, codes) {
    let codesToInsert = [];
    codes.forEach(function(codeObject) {
        codesToInsert.push({
            enrollment_id: enrollmentId,
            code_type_id: codeObject.code_type_id,
            code: codeObject.code
        })
    });
    return codesToInsert;
}

function formatSeekingToInsert(enrollmentId, seeking) {
    let seekingToInsert = [];
    seeking.forEach(function(seekingId) {
        seekingToInsert .push({
            enrollment_id: enrollmentId,
            code_type_id: seekingId
        })
    });
    return seekingToInsert;
}

module.exports.postEnrollment = function (req, res) {
    let theEnrollmentId;
    knex.transaction(function (t) {
        return knex("enrollments")
            .transacting(t)
            .insert({
                slug: randomLorem({ min: 10, max: 15 }),
                user_id: req.user.id,
                contest_id: req.body.contest_id,
                should_give_away_codes: req.body.should_give_away_codes
            })
            .returning('id')
            .then(function (enrollmentId) {
                theEnrollmentId = enrollmentId[0];
                return knex('codes')
                    .transacting(t)
                    .insert(formatCodesToInsert(theEnrollmentId, req.body.codes))
            })
            .then(function() {
                return knex('seekings')
                    .transacting(t)
                    .insert(formatSeekingToInsert(theEnrollmentId, req.body.seeking))
            })
            .then(t.commit)
            .catch(err => {
                throw new Error("Transaction Failed: " + err);
                t.rollback
            })
    })
        .then(inserts => {
            // transaction suceeded, data written
            res.status(201).json({status: "Success", enrollmentId: theEnrollmentId});
        })
        .catch(err => {
            res.status(500).json({status: "Database Error " + err});
        });
}