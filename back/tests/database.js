const db = require('../config/db');

module.exports = {
  deleteTables: () =>
    db('feedback').del()
    .then(() => db('impact').del())
    .then(() => db('customer').del())
    .then(() => db('xebian').del()),
};
