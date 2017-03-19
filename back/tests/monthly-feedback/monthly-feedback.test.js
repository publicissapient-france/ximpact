const assert = require('assert');
const XebianRepository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const ImpactRepository = require('../../src/impact/repository.impact');
const FeedbackRepository = require('../../src/feedback/repository.feedback');
const moment = require('moment');
const _ = require('lodash');

const getXebianImpacts = (impacts, xebianId) =>
  _(impacts).filter(i => i.xebianId === xebianId).value();

describe('Monthly Feedback', () => {
  it('should return an empty list if feedback has been left less than a month ago', (done) => {
    let xebianId;
    let customerId;
    CustomerRepository.addCustomer('jdupont@mycomp.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('bleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire passer tous les TU'))
      .then(impact => FeedbackRepository.addFeedback(xebianId, impact.id))
      .then(() => ImpactRepository.getImpactsToFeedback())
      .then(impacts => assert.deepEqual(getXebianImpacts(impacts, xebianId), []))
      .then(done)
      .catch(done);
  });

  it('should return a list if feedback has never been left', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    CustomerRepository.addCustomer('jdupont@mycomp.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('kleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire passer tous les TI'))
      .then(impact => impactId = impact.id)
      .then(() => ImpactRepository.getImpactsToFeedback())
      .then((impacts) => {
        const xebianImpacts = getXebianImpacts(impacts, xebianId);
        assert.equal(xebianImpacts.length, 1);
        assert.equal(xebianImpacts[0].id, impactId);
      })
      .then(done)
      .catch(done);
  });

  it('should return a list if feedback has been left more than one month ago', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    const createdAt = moment().subtract(2, 'months').valueOf();
    CustomerRepository.addCustomer('jdupont@mycomp.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('kleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire passer tous les TI'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId, createdAt))
      .then(feedback => FeedbackRepository.updateFeedback(feedback.id, customerId, xebianId, impactId, 'Mon feedback'))
      .then(() => ImpactRepository.getImpactsToFeedback())
      .then((impacts) => {
        const xebianImpacts = getXebianImpacts(impacts, xebianId);
        assert.equal(xebianImpacts.length, 1);
        assert.equal(xebianImpacts[0].id, impactId);
      })
      .then(done)
      .catch(done);
  });

  it('should return a list if feedback has been left more than one month ago', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    const createdAt = moment().subtract(2, 'months').valueOf();
    CustomerRepository.addCustomer('jdupont@mycomp.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('kleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire passer tous les TI'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId, createdAt))
      .then(() => ImpactRepository.getImpactsToFeedback())
      .then(impacts => assert.deepEqual(getXebianImpacts(impacts, xebianId), []))
      .then(done)
      .catch(done);
  });
});
