var express = require('express');
var router = express.Router();
// var app = express();
var knex = require('../db/knex');
var validator = require('../lib/validated');

function Books() {
  return knex('books');
}

function Authors() {
  return knex('authors');
}

router.get('/', function (req, res, next) {
  Authors().then(function (results) {
    res.render('authors/index', {authors: results});
  })
})

router.get('/new', function (req, res, next) {
  res.render('authors/new');
})

router.post('/', function (req, res, next) {
  var author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  }
  var errors = validator(req.body);
  if (errors.length) {
    res.render('authors/new', {info: req.body, errors: errors});
  } else {
    Authors().insert(req.body).then(function (results) {
      res.redirect('/authors');
    })
  }
})

module.exports = router;
