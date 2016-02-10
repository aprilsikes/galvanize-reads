function titleIsNotEmpty (input) {
  return !input.trim() ? 'Title cannot be empty' : true;
}
function genreIsNotEmpty (input) {
  return !input.trim() ? 'Genre cannot be empty' : true;
}
function descriptionIsNotEmpty (input) {
  return !input.trim() ? 'Description cannot be empty' : true;
}
function urlIsNotEmpty (input) {
  return !input.trim() ? 'URL cannot be empty' : true;
}
// function authorIsNotEmpty (input) {
//   return !input.trim() ? 'Author cannot be empty' : true;
// }

module.exports =  function (input) {
  var errors = [];
  errors.push(titleIsNotEmpty(input.title));
  errors.push(genreIsNotEmpty(input.genre));
  errors.push(descriptionIsNotEmpty(input.description));
  errors.push(urlIsNotEmpty(input.cover_url));
  // errors.push(authorIsNotEmpty(input.author));
  return errors.filter(function (error) {
    return error !== true;
  })
}
