exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email_address').unique().notNullable();
        table.string('password').notNullable();
        table.string('reddit_username').notNullable();
        table.boolean('is_reddit_verified').notNullable().defaultTo(false);
        table.boolean('admin').notNullable().defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};