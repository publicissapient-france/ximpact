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

  it('should list customers', (done) => {
    Repository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(() => Repository.getCustomers())
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
