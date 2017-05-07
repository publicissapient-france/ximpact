const db = require('knex')({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    database: 'postgres'
  }
});

module.exports = db;
