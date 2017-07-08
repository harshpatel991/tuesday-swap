const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('admin', salt);
    return knex('users').insert({
            email_address: 'admin@test.com',
            password: hash,
            reddit_username: 'reddit_admin',
            is_reddit_verified: true,
            admin: true
        })
        .then(function() {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync('unverified', salt);
            return knex('users').insert({
                email_address: 'unverified@test.com',
                password: hash,
                reddit_username: 'reddit_unverified',
                is_reddit_verified: false,
                admin: false
            });
        })
        .then(function() {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync('verified', salt);
            return knex('users').insert({
                email_address: 'verified@test.com',
                password: hash,
                reddit_username: 'reddit_verified',
                is_reddit_verified: true,
                admin: false
            });
        })
};

