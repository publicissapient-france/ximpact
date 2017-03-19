const assert = require('assert');
const ImpactRepository = require('../../src/impact/repository.impact');
const XebianRepository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Impact Repository', () => {
  it('should add an impact', (done) => {
    XebianRepository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then(xebian => ImpactRepository.addImpact(xebian.id, 'customerId', 'Etre Moteur'))
      .then(xebian => assert.deepEqual(_.pick(xebian, ['description']), { description: 'Etre Moteur' }))
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
