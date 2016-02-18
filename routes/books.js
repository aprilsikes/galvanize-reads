var express = require('express');
var router = express.Router();
// var app = express();
var knex = require('../db/knex');
var validate = require('../lib/validations');
var helpers = require('../lib/helpers');
var Promise = require('bluebird');

function Books() {
  return knex('books');
}

function Authors() {
  return knex('authors');
}

function Author_Book() {
  return knex('author_book');
}

router.get('/', function (req, res, next) {
  Books().select().then(function (books) {
    Promise.all(books.map(function (book) {
      return helpers.getBookAuthors(book).then(function (authors) {
        book.authors = authors;
        return book;
      })
    }))
    .then(function (books) {
      console.log(books);
      res.render('books/index', {books: books})
    })
  })
})
// / get all books from Books
  // using Promise.all map over the array of books
  // for each book, get book authors
  // add a property to each book object that is an array of its author objects
  // pass an array of authors to the view using locals


router.get('/new', function (req, res, next) {
  res.render('books/new');
})

router.post('/', function (req, res, next) {
  var book = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }
  var errors = validate(req.body);
  if (errors.length) {
    res.render('books/new', {info: req.body, errors: errors});
  } else {
    Books().insert(req.body).then(function (results) {
      res.redirect('/books');
    })
  }
})

router.get('/:id/delete', function (req, res, next) {
  Books().where('id', req.params.id).first().then(function (results) {
  res.render('books/delete', {book: results});
  })
})

router.post('/:id/delete', function (req, res, next) {
  Books().where('id', req.params.id).del().then(function (results) {
    res.redirect('/books');
  })
})

router.get('/:id/edit', function (req, res, next) {
  Books().where('id', req.params.id).first().then(function (results) {
    res.render('books/edit', {book: results});
  })
})

router.post('/:id/update', function (req, res, next) {
  var errors = validate(req.body);
  if (errors.length) {
    Books().where('id', req.params.id).first().then(function (results) {
      res.render('books/edit', {book: results, errors: errors});
    })
  } else {
    Books().where('id', req.params.id).update(req.body).then(function (results) {
      res.redirect('/books');
    })
  }
})

router.get('/:id', function (req, res, next) {
  Books().where('id', req.params.id).first().then(function (results) {
    res.render('books/show', {book: results});
  })
})

module.exports = router;
