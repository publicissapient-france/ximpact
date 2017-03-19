const assert = require('assert');
const Repository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Customer Repository', () => {
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

  it('should find a customer by id', (done) => {
    Repository
      .addCustomer('My Company', 'Paxime', 'Fontania', 'pfontania@mycompany.com')
      .then(customer => Repository.getCustomer(customer.id))
      .then(customer => assert.equal(customer.email, 'pfontania@mycompany.com'))
      .then(done)
      .catch(done);
  });

  it('should update a customer', (done) => {
    Repository
      .addCustomer('My Company', 'Laxime', 'Fontania', 'lfontania@mycompany.com')
      .then(customer => Repository.updateCustomer(customer.id, 'The Company', 'Naxime', 'Pontania', 'npontania@thecompany.com'))
      .then((customer) => {
        assert.deepEqual(_.omit(customer, ['createdAt', 'updatedAt', 'id']),
          {
            company: 'The Company',
            email: 'npontania@thecompany.com',
            firstName: 'Naxime',
            lastName: 'Pontania',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should list customers', (done) => {
    Repository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(() => Repository.getCustomers())
      .then(customers => assert.ok(_(customers).find(customer => customer.email === 'mfontania@mycompany.com')))
      .then(done)
      .catch(done);
  });
});
