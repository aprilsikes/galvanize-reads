
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author_book', function(table){
    table.integer('author_id');
    table.integer('book_id');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author_book');
};
