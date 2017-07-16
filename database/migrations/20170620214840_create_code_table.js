exports.up = function(knex, Promise) {
    return knex.schema.createTable('codes', (table) => {
        table.increments('id').primary();
        table.integer('enrollment_id').notNullable().references('enrollments.id');
        table.integer('code_type_id').notNullable().references('code_types.id');
        table.string('code').notNullable();
        table.boolean('taken').notNullable().defaultTo(false);
        table.integer('taken_by').nullable().references('users.id');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));

        table.index('enrollment_id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('codes');
};