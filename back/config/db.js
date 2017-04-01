const db = require('knex')({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres'
  }
});

module.exports = db;
