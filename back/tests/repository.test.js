const Repository = require('../src/repository');
const DynamoCustomer = require('../src/models/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('../src/models/dynamo.xebian').DynamoXebian;
const vogels = require('../config/vogels');

const assert = require('assert');
const _ = require('lodash');

describe('Repository', () => {
  before((done) => {
    vogels.createTables({
      Xebians: { readCapacity: 1, writeCapacity: 1 },
      Customers: { readCapacity: 1, writeCapacity: 1 },
    }, done);
  });

  after(() => {
    DynamoCustomer.deleteTable();
    DynamoXebian.deleteTable();
  });

  it('should add a customer', (done) => {
    Repository
      .addCustomer('company', 'firstName', 'lastName', 'email@domain.com')
      .then((customer) => {
        assert.deepEqual(_.omit(customer.attrs, ['createdAt']),
          {
            company: 'company',
            email: 'email@domain.com',
            firstName: 'firstName',
            lastName: 'lastName',
            id: 'company_email@domain.com',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should add a xebian', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then((xebian) => {
        assert.deepEqual(_.omit(xebian.attrs, ['createdAt']),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            lastName: 'Smadja',
            id: 'jsmadja@xebia.fr_Smadja',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should list customers by company', (done) => {
    Repository
      .getCustomersByCompany('company_email@domain.com')
      .then((customers) => {
        assert.deepEqual(
          _.omit(customers[0].attrs, 'createdAt'),
          {
            company: 'company',
            email: 'email@domain.com',
            firstName: 'firstName',
            lastName: 'lastName',
            id: 'company_email@domain.com',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should find xebians by email', (done) => {
    Repository
      .getXebians('jsmadja@xebia.fr_Smadja')
      .then((xebians) => {
        assert.deepEqual(_.omit(xebians[0].attrs, 'createdAt'),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            id: 'jsmadja@xebia.fr_Smadja',
            lastName: 'Smadja',
          });
      })
      .then(done)
      .catch(done);
  });
});
