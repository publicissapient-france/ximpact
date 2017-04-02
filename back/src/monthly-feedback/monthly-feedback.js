const ImpactRepository = require('../impact/repository.impact');
const FeedbackRepository = require('../feedback/repository.feedback');
const CustomerRepository = require('../customer/repository.customer');
const XebianRepository = require('../xebian/repository.xebian');
const Promise = require('bluebird');
const MailService = require('../mail/mail.service');

const createAndSendFeedback = (impact) => {
  let customer;
  let xebian;
  return FeedbackRepository.createCustomerFeedback(impact.id, impact.customer_id)
    .then(() => CustomerRepository.getCustomer(impact.customer_id))
    .then(_customer => customer = _customer)
    .then(() => XebianRepository.getXebian(impact.xebian_id))
    .then(_xebian => xebian = _xebian)
    .then((feedback) => {
      feedback.token = FeedbackRepository.createToken(feedback);
      return MailService.send({ to: customer.email, feedback, customer, xebian, impact, template: 'invitation-email' });
    });
};

module.exports = {
  sendFeedbackRequest: () => ImpactRepository
    .getImpactsToFeedback()
    .then(impacts => Promise.mapSeries(impacts, createAndSendFeedback)),
};
