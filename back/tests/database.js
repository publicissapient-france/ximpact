const vogels = require('../config/vogels');
const DynamoCustomer = require('../src/customer/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('../src/xebian/dynamo.xebian').DynamoXebian;
const Promise = require('bluebird');

module.exports = {
  createTables: (done) => {
    vogels.createTables({
      Customers: {},
      Xebians: {},
    }, done);
  },

  deleteTables: (done) => {
    const tables = [DynamoCustomer, DynamoXebian];
    Promise
      .mapSeries(tables, table => Promise.promisify(table.deleteTable)())
      .then(() => done())
      .catch(done);
  },

};
