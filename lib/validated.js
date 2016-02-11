function firstNameIsNotEmpty (input) {
  return !input.trim() ? 'First name cannot be empty' : true;
}
function lastNameIsNotEmpty (input) {
  return !input.trim() ? 'Last name cannot be empty' : true;
}
function biographyIsNotEmpty (input) {
  return !input.trim() ? 'Biography cannot be empty' : true;
}
function urlIsNotEmpty (input) {
  return !input.trim() ? 'URL cannot be empty' : true;
}
// function authorIsNotEmpty (input) {
//   return !input.trim() ? 'Author cannot be empty' : true;
// }

module.exports =  function (input) {
  var errors = [];
  errors.push(firstNameIsNotEmpty(input.first_name));
  errors.push(lastNameIsNotEmpty(input.last_name));
  errors.push(biographyIsNotEmpty(input.biography));
  errors.push(urlIsNotEmpty(input.portrait_url));
  // errors.push(authorIsNotEmpty(input.author));
  return errors.filter(function (error) {
    return error !== true;
  })
}
