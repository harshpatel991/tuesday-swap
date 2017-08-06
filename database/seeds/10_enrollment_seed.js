exports.seed = function(knex, Promise) {
    return knex('enrollments').insert({
            slug: 'test_enrollment',
            user_id: 3,
            contest_id: 1,
            should_give_away_codes: false
        })
        .then(function() {
            return knex('codes').insert({
                enrollment_id: 1,
                code_type_id: 1,
                code: 'this is a code I entered',
                taken: false,
                taken_by: null
            });
        })
        .then(function() {
            return knex('seekings').insert({
                enrollment_id: 1,
                code_type_id: 1
            });
        })
        //------------------------------------
        .then(function() {
            return knex('enrollments').insert({
                slug: 'test_enrollment2',
                user_id: 4,
                contest_id: 1,
                should_give_away_codes: false
            });
        })
        .then(function() {
            return knex('codes').insert({
                enrollment_id: 2,
                code_type_id: 1,
                code: 'this is a code I entered',
                taken: false,
                taken_by: null
            });
        })
        .then(function() {
            return knex('codes').insert({
                enrollment_id: 2,
                code_type_id: 2,
                code: 'this is a code I entered',
                taken: false,
                taken_by: null
            });
        })
        .then(function() {
            return knex('codes').insert({
                enrollment_id: 2,
                code_type_id: 3,
                code: 'this is a code I entered',
                taken: false,
                taken_by: null
            });
        })
        .then(function() {
            return knex('seekings').insert({
                enrollment_id: 2,
                code_type_id: 4
            });
        })
        .then(function() {
            return knex('seekings').insert({
                enrollment_id: 2,
                code_type_id: 5
            });
        })
        .then(function() {
            return knex('seekings').insert({
                enrollment_id: 2,
                code_type_id: 6
            });
        })
        //------------------------------------
        .then(function() {
            return knex('enrollments').insert({
                slug: 'test_enrollment3',
                user_id: 5,
                contest_id: 1,
                should_give_away_codes: false
            });
        })
        .then(function() {
            return knex('codes').insert({
                enrollment_id: 3,
                code_type_id: 1,
                code: 'this is a code I entered',
                taken: false,
                taken_by: null
            });
        })
        .then(function() {
            return knex('seekings').insert({
                enrollment_id: 3,
                code_type_id: 1
            });
        })
        //------------------------------------
        .then(function() {
            return knex('enrollments').insert({
                slug: 'test_enrollment4',
                user_id: 6,
                contest_id: 1,
                should_give_away_codes: false
            });
        })
        .then(function() {
            return knex('codes').insert({
                enrollment_id: 4,
                code_type_id: 1,
                code: 'this is a code I entered',
                taken: false,
                taken_by: null
            });
        })
        .then(function() {
            return knex('seekings').insert({
                enrollment_id: 4,
                code_type_id: 1
            });
        })
};

