var express = require('express');
var router = express.Router();
// var app = express();
var knex = require('../db/knex');
var validate = require('../lib/validations');

function Books() {
  return knex('books');
}

function Authors() {
  return knex('authors');
}

// function AuthorBook() {
//   return knex('author_book');
// }

router.get('/', function (req, res, next) {
  Books().then(function (results) {
    // Authors().select('first_name', 'last_name').join('author_book', 'authors.id', '=', 'author_book.author_id').where('author_book.book_id', req.body.id).then(function (payload) {
    //
    // })
    // Authors().join('author_book', 'author_book.author_id', 'authors.id').then(function (payload) {
    //   console.log(payload);
        res.render('books/index', {books: results});
    // })
  })
})

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
