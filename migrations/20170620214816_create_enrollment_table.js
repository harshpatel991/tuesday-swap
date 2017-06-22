exports.up = function(knex, Promise) {
    return knex.schema.createTable('enrollments', (table) => {
        table.increments('id').primary();
        table.string('slug').notNullable();
        table.integer('user_id').notNullable().references('users.id');
        table.integer('contest_id').notNullable().references('contests.id');
        table.boolean('should_give_away_codes').notNullable().defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('enrollments');
};