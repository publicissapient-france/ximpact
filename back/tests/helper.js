const Database = require('./database');

// globals
global.assert = require('assert');

// setup
before(Database.createTables);
beforeEach(() => {
});

// teardown
after(Database.deleteTables);
afterEach(() => {
});
