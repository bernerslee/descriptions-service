
exports.up = function(knex, Promise) {
    return Promise.all(
        [knex.schema.createTableIfNotExists('houses', (table) => {
            table.integer('id').primary();
            table.text('street');
            table.text('city');
            table.text('state');
            table.text('zipcode');
            table.text('description');
            table.timestamps(true, true);
        })]
    )
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('houses');
};
