
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('books').del(),

    // Inserts seed entries
    knex('books').insert({
      id: 1,
      title: 'Python In A Nutshell',
      genre: 'Python'
      description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.'
      cover_url:
      author_id:
    }),
    knex('books').insert({
      id: 2,
      title: 'rowValue',
      genre:
      description:
      cover_url:
      author_id:
    }),
    knex('books').insert({
      id: 3,
      title: 'rowValue',
      genre:
      description:
      cover_url:
      author_id:
    }),
    knex('books').insert({
      id: 4,
      title: 'rowValue',
      genre:
      description:
      cover_url:
      author_id:
    }),
    knex('books').insert({
      id: 5,
      title: 'rowValue',
      genre:
      description:
      cover_url:
      author_id:
    }),
    knex('books').insert({
      id: 6,
      title: 'rowValue',
      genre:
      description:
      cover_url:
      author_id:
    }),
  );
};
