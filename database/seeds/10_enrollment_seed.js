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

};

