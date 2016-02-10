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

module.exports = router;
