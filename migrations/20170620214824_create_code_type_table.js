exports.up = function(knex, Promise) {
    return knex.schema.createTable('code_types', (table) => {
        table.increments('id').primary();
        table.integer('contest_id').notNullable().references('contests.id');
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('description').notNullable();
        table.string('instructions').notNullable();
        table.timestamp('end_at').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('code_types');
};