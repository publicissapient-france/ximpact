const Repository = require('../src/repository');

const assert = require('assert');

describe('Repository', () => {
  it('should add a customer', (done) => {
    Repository
      .addCustomer('company', 'firstName', 'lastName', 'email')
      .then(() => Repository.getCustomer('email', 'lastName'))
      .then((customer) => {
        assert.deepEqual(customer,
          {
            company: 'company',
            email: 'email',
            firstName: 'firstName',
            lastName: 'lastName',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should add a xebian', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien')
      .then(() => Repository.getXebian('jsmadja@xebia.fr', 'Julien'))
      .then((xebian) => {
        assert.deepEqual(xebian,
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should list customers by company', (done) => {
    Repository
      .getCustomersByCompany('company')
      .then((customers) => {
        assert.deepEqual(customers,
          [
            {
              company: 'company',
              email: 'email',
              firstName: 'firstName',
              lastName: 'lastName',
            },
          ]);
      })
      .then(done)
      .catch(done);
  });

  it('should find xebians by email', (done) => {
    Repository
      .getXebians('jsmadja')
      .then((xebians) => {
        assert.deepEqual(xebians, [
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
          },
        ]);
      })
      .then(done)
      .catch(done);
  });
});
