var express = require('express');
var router = express.Router();
// var app = express();
var knex = require('../db/knex');
var validate = require('../lib/validations');

function Books() {
  return knex('books');
}

router.get('/', function (req, res, next) {
  Books().select().then(function (results) {
    res.render('books/index', {books: results})
  })
})

router.get('/new', function (req, res, next) {
  res.render('books/new')
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
    res.render('books/new', {info: req.body, errors: errors})
  } else {
    Books().insert(req.body).then(function (results) {
      console.log(results);
      res.redirect('/books');
    })
  }
})

module.exports = router;
