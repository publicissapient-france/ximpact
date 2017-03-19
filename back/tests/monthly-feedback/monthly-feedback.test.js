const assert = require('assert');
const Repository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Monthly Feedback', () => {
  it('should return an empty list if feedback has been left less than a month ago', (done) => {
    let xebianId;
    let customerId;
    CustomerRepository.addCustomer('My comp', 'Jean', 'Dupont', 'jdupont@mycomp.com')
      .then(customer => customerId = customer.id)
      .then(() => Repository.addXebian('bleponge@xebia.fr', 'Bob', 'Leponge'))
      .then(xebian => xebianId = xebian.id)
      .then(() => Repository.addImpact(xebianId, customerId, 'Faire un BBL par mois'))
      .then(impact => Repository.addFeedback(xebianId, impact.id, 'Super!'))
      .then(() => Repository.getImpactsToFeedback())
      .then(impacts => assert.deepEqual(impacts, []))
      .then(done)
      .catch(done);
  });

  it('should return a list if feedback has never been left', (done) => {
    let xebianId;
    let customerId;
    CustomerRepository.addCustomer('My comp', 'Jean', 'Dupont', 'jdupont@mycomp.com')
      .then(customer => customerId = customer.id)
      .then(() => Repository.addXebian('kleponge@xebia.fr', 'Kob', 'Leponge'))
      .then(xebian => xebianId = xebian.id)
      .then(() => Repository.addImpact(xebianId, customerId, 'Faire un BBL par mois'))
      .then(() => Repository.getImpactsToFeedback())
      .then(impacts => assert.deepEqual(_(impacts).map(i => _.pick(i, 'description')).value(), [{ description: 'Faire un BBL par mois' }]))
      .then(done)
      .catch(done);
  });
});
