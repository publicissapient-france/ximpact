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
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire compiler un module'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(impactId))
      .then(feedback => assert.deepEqual(_.pick(feedback, ['impact_id']),
        {
          impact_id: impactId,
        }))
      .then(done)
      .catch(done);
  });

  it('should updated a feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    let feedbackId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre proactif'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(impactId, 'comment1'))
      .then(feedback => feedbackId = feedback.id)
      .then(() => FeedbackRepository.updateFeedback(feedbackId, 'Ca c est mon comment'))
      .then(() => FeedbackRepository.getFeedback(feedbackId))
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
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('bleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre ponctuel'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(impactId))
      .then(feedback => feedbackId = feedback.id)
      .then(() => FeedbackRepository.getFeedback(feedbackId))
      .then(feedback => assert.deepEqual(_.pick(feedback, ['id', 'impact_id']), {
        id: feedbackId,
        impact_id: impactId,
      }))
      .then(done)
      .catch(done);
  });

  it('should add a comment on a feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => CustomerRepository.updateCustomer(customerId, 'MyCompany', 'Maxime', 'Fontania', 'mfontania@mycompany.com'))
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => XebianRepository.updateXebian(xebianId, 'Julien', 'Smadja', 'jsmadja@xebia.fr'))
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire compiler un module'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(impactId))
      .then(feedback => FeedbackRepository.updateFeedback(feedback.id, 'Le module compile une fois sur deux', [], customerId))
      .then(() => FeedbackRepository.addFeedback(impactId, 'Ca depend d une autre équipe!', undefined, xebianId))
      .then((feedback) => {
        const comment = _.pick(feedback, ['comment', 'impact_id', 'xebian_id']);
        assert.deepEqual(comment, {
          comment: 'Ca depend d une autre équipe!',
          xebian_id: xebianId,
          impact_id: impactId,
        });
      })
      .then(done)
      .catch(done);
  });

  it('should get a customer feedback by token', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    let feedbackId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire compiler un module'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.createCustomerFeedback(impactId, customerId))
      .then((feedback) => {
        feedbackId = feedback.id;
        return FeedbackRepository.createToken(feedback);
      })
      .then(token => FeedbackRepository.getFeedbackByToken(token))
      .then(feedback => assert.equal(feedbackId, feedback.id))
      .then(done)
      .catch(done);
  });
});
