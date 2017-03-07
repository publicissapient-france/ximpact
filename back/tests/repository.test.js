const Repository = require('../src/repository');
const DynamoCustomer = require('../src/customer/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('../src/xebian/dynamo.xebian').DynamoXebian;
const DynamoImpact = require('../src/impact/dynamo.impact').DynamoImpact;
const DynamoFeedback = require('../src/feedback/dynamo.feedback').DynamoFeedback;
const vogels = require('../config/vogels');
const Promise = require('bluebird');

const assert = require('assert');
const _ = require('lodash');

describe('Repository', () => {
  const createTables = (done) => {
    vogels.createTables({
      Xebians: {},
      Customers: {},
      Impacts: {},
      Feedbacks: {},
    }, done);
  };

  const deleteTables = (done) => {
    const tables = [DynamoCustomer, DynamoXebian, DynamoImpact, DynamoFeedback];
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
        assert.deepEqual(_.omit(customer.attrs, ['createdAt', 'id']),
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

  it('should add a xebian', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then((xebian) => {
        assert.deepEqual(_.omit(xebian.attrs, ['createdAt', 'id']),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            lastName: 'Smadja',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should add an impact', (done) => {
    Repository
      .addImpact('xebianId', 'customerId', 'Faire un BBL par mois')
      .then((impact) => {
        assert.deepEqual(_.omit(impact.attrs, ['createdAt', 'id', 'xebianId', 'customerId']),
          {
            description: 'Faire un BBL par mois',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should add a feedback', (done) => {
    Repository
      .addFeedback('impactId', 'Super!')
      .then((feedback) => {
        assert.deepEqual(_.omit(feedback.attrs, ['createdAt', 'id', 'impactId']),
          {
            comment: 'Super!',
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

  it('should find xebians by email', (done) => {
    Repository
      .getXebians()
      .then((xebians) => {
        assert.deepEqual(_.omit(xebians[0], ['createdAt', 'id']),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            lastName: 'Smadja',
          });
      })
      .then(done)
      .catch(done);
  });
});
