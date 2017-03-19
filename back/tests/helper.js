const Database = require('./database');

// globals
global.assert = require('assert');

// setup
before(Database.createTables);
// beforeEach(Database.createTables);

// teardown
after(Database.deleteTables);
// afterEach(Database.deleteTables);
// after(Database.deleteTables);
afterEach(() => {
});
