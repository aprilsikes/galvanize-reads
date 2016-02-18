var Promise = require('bluebird');
var knex = require('../db/knex');

function Authors() {
  return knex('authors');
}

function Books(){
  return knex('books');
}

function Author_Book() {
  return knex('author_book');
}

function getAuthorBooks(author) {
  return Author_Book().where('author_id', author.id).then(function (results) {
    return Promise.all(results.map (function (result) {
      return Books().where('id', result.book_id).first();
    }))
    .then(function (books) {
      return books;
    })
  })
  // get all associated records from Author_Book √
  // using Promise.all map over the array of records √
  // return a single array of author books √
}

function getBookAuthors(book) {
  return Author_Book().where('book_id', book.id).then(function (results) {
    return Promise.all(results.map (function (result) {
      return Authors().where('id', result.author_id).first();
    }))
    .then(function (authors) {
      return authors;
    })
  })
  // get all associated records from Author_Book √
  // using Promise.all map over the array of records √
  // return a single array of book authors √
}

module.exports = {
  // prepIds: prepIds,
  // flattenArray: flattenArray,
  // insertIntoAuthorsBooks: insertIntoAuthorsBooks,
  getAuthorBooks: getAuthorBooks,
  getBookAuthors: getBookAuthors
}
