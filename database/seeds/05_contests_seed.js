exports.seed = function(knex, Promise) {
    return knex('contests').insert({
            name: 'Contest1',
            description: 'Description 1',
            end_at: '3017-06-25 15:13:26-00'
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 1,
                name: 'Code Type 1',
                image: '/code_type_1.jpg',
                description: 'Code Type Description 1',
                instructions: 'Code Type Instructions 1',
                end_at: '3011-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 1,
                name: 'Code Type 2',
                image: '/code_type_2.jpg',
                description: 'Code Type Description 2',
                instructions: 'Code Type Instructions 2',
                end_at: '3011-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 1,
                name: 'Code Type 3',
                image: '/code_type_3.jpg',
                description: 'Code Type Description 3',
                instructions: 'Code Type Instructions 3',
                end_at: '3011-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 1,
                name: 'Code Type 4',
                image: '/code_type_4.jpg',
                description: 'Code Type Description 4',
                instructions: 'Code Type Instructions 4',
                end_at: '3011-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 1,
                name: 'Code Type 5',
                image: '/code_type_5.jpg',
                description: 'Code Type Description 5',
                instructions: 'Code Type Instructions 5',
                end_at: '3011-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 1,
                name: 'Code Type 6',
                image: '/code_type_6.jpg',
                description: 'Code Type Description 6',
                instructions: 'Code Type Instructions 6',
                end_at: '3011-06-25 15:13:26-00'
            });
        })

        .then(function() {
            return knex('contests').insert({
                name: 'Contest2',
                description: 'Description 2',
                end_at: '2025-06-25 15:13:26-00'
            })
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 2,
                name: 'Code Type 7',
                image: '/code_type_7.jpg',
                description: 'Code Type Description 7',
                instructions: 'Code Type Instructions 7',
                end_at: '3013-06-25 15:13:26-00'
            });
        })

        .then(function() {
            return knex('contests').insert({
                name: 'Contest3',
                description: 'Description 3',
                end_at: '2025-06-25 15:13:26-00'
            })
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 3,
                name: 'Code Type 8',
                image: '/code_type_8.jpg',
                description: 'Code Type Description 8',
                instructions: 'Code Type Instructions 8',
                end_at: '3013-06-25 15:13:26-00'
            });
        })

        .then(function() {
            return knex('contests').insert({
                name: 'Contest4',
                description: 'Description 4',
                end_at: '2025-06-25 15:13:26-00'
            })
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 4,
                name: 'Code Type 9',
                image: '/code_type_9.jpg',
                description: 'Code Type Description 9',
                instructions: 'Code Type Instructions 9',
                end_at: '3013-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 4,
                name: 'Code Type 10',
                image: '/code_type_10.jpg',
                description: 'Code Type Description 10',
                instructions: 'Code Type Instructions 10',
                end_at: '3013-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 4,
                name: 'Code Type 11',
                image: '/code_type_11.jpg',
                description: 'Code Type Description 11',
                instructions: 'Code Type Instructions 11',
                end_at: '3013-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 4,
                name: 'Code Type 12',
                image: '/code_type_12.jpg',
                description: 'Code Type Description 12',
                instructions: 'Code Type Instructions 12',
                end_at: '3013-06-25 15:13:26-00'
            });
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 4,
                name: 'Code Type 13',
                image: '/code_type_13.jpg',
                description: 'Code Type Description 13',
                instructions: 'Code Type Instructions 13',
                end_at: '3013-06-25 15:13:26-00'
            });
        })

        .then(function() {
            return knex('contests').insert({
                name: 'Contest5',
                description: 'Description 5',
                end_at: '2025-06-25 15:13:26-00'
            })
        })
        .then(function() {
            return knex('code_types').insert({
                contest_id: 5,
                name: 'Code Type 14',
                image: '/code_type_14.jpg',
                description: 'Code Type Description 14',
                instructions: 'Code Type Instructions 14',
                end_at: '3013-06-25 15:13:26-00'
            });
        })

        .then(function() {
            return knex('code_types').insert({
                contest_id: 5,
                name: 'Code Type 15',
                image: '/code_type_15.jpg',
                description: 'Code Type Description 15',
                instructions: 'Code Type Instructions 15',
                end_at: '3013-06-25 15:13:26-00'
            });
        })

        .then(function() {
            return knex('contests').insert({ // a contest that has already expired
                name: 'Contest6',
                description: 'Description 6',
                end_at: '2017-06-25 15:13:26-00'
            })
        })


};

