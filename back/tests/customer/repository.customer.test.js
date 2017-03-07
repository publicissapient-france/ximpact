const Repository = require('../../src/customer/repository.customer');
const DynamoCustomer = require('../../src/customer/dynamo.customer').DynamoCustomer;
const vogels = require('../../config/vogels');
const Promise = require('bluebird');

const assert = require('assert');
const _ = require('lodash');

describe('Customer Repository', () => {
  const createTables = (done) => {
    vogels.createTables({
      Customers: {},
    }, done);
  };

  const deleteTables = (done) => {
    const tables = [DynamoCustomer];
    Promise
      .mapSeries(tables, table => Promise.promisify(table.deleteTable)())
      .then((deletions) => {
        deletions.forEach((deletion) => {
          const description = deletion.TableDescription;
          console.log(`${description.TableName}: ${description.TableStatus}`);
        });
      })
      .then(done)
      .catch(done);
  };

  before(createTables);

  after(deleteTables);

  it('should add a customer', (done) => {
    Repository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then((customer) => {
        assert.deepEqual(_.omit(customer, ['createdAt', 'id']),
          {
            company: 'My Company',
            email: 'mfontania@mycompany.com',
            firstName: 'Maxime',
            lastName: 'Fontania',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should list customers by company', (done) => {
    Repository
      .getCustomers()
      .then((customers) => {
        assert.deepEqual(
          _.omit(customers[0], ['createdAt', 'id']),
          {
            company: 'My Company',
            email: 'mfontania@mycompany.com',
            firstName: 'Maxime',
            lastName: 'Fontania',
          });
      })
      .then(done)
      .catch(done);
  });
});
