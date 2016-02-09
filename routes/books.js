var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function Books() {
  return knex('books');
}


router.get('/', function (req, res, next) {
  Books().select().then(function (results) {
    console.log(results);
    res.render('books/index', {books: results})
  })
})

module.exports = router;
