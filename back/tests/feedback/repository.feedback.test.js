const assert = require('assert');
const ImpactRepository = require('../../src/impact/repository.impact');
const FeedbackRepository = require('../../src/feedback/repository.feedback');
const XebianRepository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Feedback Repository', () => {
  it('should add a feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    CustomerRepository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire compiler un module'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId))
      .then(feedback => assert.deepEqual(_.omit(feedback, ['id', 'createdAt']), { xebianId, customerId, impactId }))
      .then(done)
      .catch(done);
  });

  it('should updated a feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    let feedbackId;
    CustomerRepository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre proactif'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId))
      .then(feedback => feedbackId = feedback.id)
      .then(() => FeedbackRepository.updateFeedback(feedbackId, customerId, xebianId, impactId, 'Ca c est mon comment'))
      .then(() => FeedbackRepository.getFeedback(xebianId, impactId, customerId, feedbackId))
      .then(feedback => assert.equal(feedback.comment, 'Ca c est mon comment'))
      .then(done)
      .catch(done);
  });

  it('should get feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    let feedbackId;
    CustomerRepository
      .addCustomer('My Company', 'Maxime', 'Fontania', 'mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('bleponge@xebia.fr', 'Bob', 'Leponge'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre ponctuel'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId))
      .then(feedback => feedbackId = feedback.id)
      .then(() => FeedbackRepository.getFeedback(xebianId, impactId, customerId, feedbackId))
      .then(feedback => assert.deepEqual(_.omit(feedback, ['createdAt']), {
        customerId,
        xebianId,
        id: feedbackId,
        impactId,
      }))
      .then(done)
      .catch(done);
  });
});
