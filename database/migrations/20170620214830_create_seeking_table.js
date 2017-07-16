exports.up = function(knex, Promise) {
    return knex.schema.createTable('seekings', (table) => {
        table.increments('id').primary();
        table.integer('enrollment_id').notNullable().references('enrollments.id');
        table.integer('code_type_id').notNullable().references('code_types.id');
        table.integer('num_times_satisfied').notNullable().defaultTo(0);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));

        table.index('enrollment_id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('seekings');
};