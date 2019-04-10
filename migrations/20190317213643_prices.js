
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('prices', (table) => {
    table.integer('id');
    table.integer('price');
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('prices')
};
