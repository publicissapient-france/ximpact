const assert = require('assert');
const ImpactRepository = require('../../src/impact/repository.impact');
const XebianRepository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Impact Repository', () => {
  it('should add an impact', (done) => {
    let customerId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => ImpactRepository.addImpact(xebian.id, customerId, 'Etre Moteur'))
      .then(impact => {
        assert.deepEqual(_.pick(impact, ['description']), { description: 'Etre Moteur' });
        assert.equal(impact.customer.id, customerId);
      })
      .then(done)
      .catch(done);
  });

  it('should get impact', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('bleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre vaillant'))
      .then(impact => impactId = impact.id)
      .then(() => ImpactRepository.getImpact(xebianId, customerId, impactId))
      .then(impact => assert.equal(impact.description, 'Etre vaillant'))
      .then(done)
      .catch(done);
  });
});
