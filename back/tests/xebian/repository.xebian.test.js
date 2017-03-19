const assert = require('assert');
const Repository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Xebian Repository', () => {
  it('should add a xebian', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then((xebian) => {
        assert.deepEqual(_.omit(xebian, ['createdAt', 'id']),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            lastName: 'Smadja',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should update a xebian', (done) => {
    Repository
      .addXebian('lfontania@xebia.fr', 'Laxime', 'Fontania')
      .then((xebian) => Repository.updateXebian(xebian.id, 'Naxime', 'Pontania', 'npontania@zelia.fr'))
      .then((customer) => {
        assert.deepEqual(_.omit(customer, ['createdAt', 'updatedAt', 'id']),
          {
            email: 'npontania@zelia.fr',
            firstName: 'Naxime',
            lastName: 'Pontania',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should find a xebian by id', (done) => {
    Repository
      .addXebian('psmadja@xebia.fr', 'Pulien', 'Smadja')
      .then((xebian) => Repository.getXebian(xebian.id))
      .then((xebian) => assert.equal(xebian.email, 'psmadja@xebia.fr'))
      .then(done)
      .catch(done);
  });

  it('should add an impact', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then(xebian => Repository.addImpact(xebian.id, 'customerId', 'Faire un BBL par mois'))
      .then(xebian => assert.deepEqual(_.pick(xebian, ['description']), { description: 'Faire un BBL par mois' }))
      .then(done)
      .catch(done);
  });

  it('should add a feedback', (done) => {
    let xebianId;
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then((xebian) => {
        xebianId = xebian.id;
        return xebian;
      })
      .then(xebian => Repository.addImpact(xebian.id, 'customerId', 'Faire un BBL par mois'))
      .then(impact => Repository.addFeedback(xebianId, impact.id, 'Super!'))
      .then(feedback => assert.deepEqual(_.pick(feedback, ['comment']), { comment: 'Super!' }))
      .then(done)
      .catch(done);
  });

  it('should updated a feedback', (done) => {
    let xebianId, customerId, impactId, feedbackId;
    CustomerRepository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => Repository.addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja'))
      .then(xebian => xebianId = xebian.id)
      .then(xebian => Repository.addImpact(xebianId, customerId, 'Faire un BBL par mois'))
      .then(impact => impactId = impact.id)
      .then(impact => Repository.addFeedback(xebianId, impactId, 'Super!'))
      .then(feedback => feedbackId = feedback.id)
      .then(() => Repository.updateFeedback(feedbackId, customerId, xebianId, impactId, 'Ca c est mon comment'))
      .then(() => Repository.getFeedback(xebianId, impactId, customerId, feedbackId))
      .then(feedback => assert.equal(feedback.comment, 'Ca c est mon comment'))
      .then(done)
      .catch(done);
  });

  it('should find all xebians', (done) => {
    Repository
      .addXebian('xsmadja@xebia.fr', 'Xulien', 'Smadja')
      .then(() => Repository.getXebians())
      .then((xebians) => {
        const filtered = _(xebians).filter(xebian => xebian.email === 'xsmadja@xebia.fr').value();
        assert.equal(filtered.length, 1);
      })
      .then(done)
      .catch(done);
  });

  it('should get feedback', (done) => {
    let xebianId, customerId, impactId, feedbackId;
    CustomerRepository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => Repository.addXebian('bleponge@xebia.fr', 'Bob', 'Leponge'))
      .then(xebian => xebianId = xebian.id)
      .then(() => Repository.addImpact(xebianId, customerId, 'Faire un BBL par mois'))
      .then(impact => impactId = impact.id)
      .then(impact => Repository.addFeedback(xebianId, impactId, 'Super!'))
      .then(feedback => feedbackId = feedback.id)
      .then(feedback => Repository.getFeedback(xebianId, impactId, customerId, feedbackId))
      .then(feedback => assert.equal(feedback.comment, 'Super!'))
      .then(done)
      .catch(done);
  });

  it('should get impact', (done) => {
    let xebianId, customerId, impactId;
    CustomerRepository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => Repository.addXebian('bleponge@xebia.fr', 'Bob', 'Leponge'))
      .then(xebian => xebianId = xebian.id)
      .then(() => Repository.addImpact(xebianId, customerId, 'Faire un BBL par mois'))
      .then(impact => impactId = impact.id)
      .then(impact => Repository.getImpact(xebianId, customerId, impactId))
      .then(impact => assert.equal(impact.description, 'Faire un BBL par mois'))
      .then(done)
      .catch(done);
  });
});
