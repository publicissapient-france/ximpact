const Database = require('./database');

// globals
global.assert = require('assert');

// setup
beforeEach(Database.deleteTables);

// teardown
