const Repository = require('../src/repository');

const assert = require('assert');

describe('Repository', () => {
  it('should add a customer', (done) => {
    Repository
      .addCustomer('company', 'firstName', 'lastName', 'email')
      .then((customer) => {
        assert.deepEqual(customer, {
          Attributes: {
            company: 'company',
            email: 'email',
            firstName: 'firstName',
            lastName: 'lastName',
          },
        });
      })
      .then(done)
      .catch(done);
  });

  it('should list customers by company', (done) => {
    Repository
      .getCustomersByCompany('company')
      .then((customers) => {
        assert.deepEqual(customers, {
          Count: 1,
          Items: [
            {
              company: 'company',
              email: 'email',
              firstName: 'firstName',
              lastName: 'lastName',
            },
          ],
          ScannedCount: 1,
        });
      })
      .then(done)
      .catch(done);
  });
});
