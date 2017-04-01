const Xebian = require('./type.xebian');
const XebianRepository = require('./repository.xebian');
const FeedbackRepository = require('../feedback/repository.feedback');
const ImpactRepository = require('../impact/repository.impact');
const CustomerRepository = require('../customer/repository.customer');
const Promise = require('bluebird');

const {
  GraphQLList, GraphQLNonNull, GraphQLString,
} = require('graphql');

const xebians = {
  type: new GraphQLList(Xebian),
  resolve() {
    return XebianRepository.getXebians();
  },
};

const attachCustomer = impact =>
  CustomerRepository
    .getCustomer(impact.customer_id)
    .then(customer => impact.customer = customer);

const createAuthor = person => ({
  id: person.id,
  firstname: person.firstname,
  lastname: person.lastname,
});

const attachAuthor = (feedback) => {
  if (feedback.xebian_id) {
    return XebianRepository.getXebian(feedback.xebian_id)
      .then(xebian => feedback.author = createAuthor(xebian));
  }
  if (feedback.customer_id) {
    return CustomerRepository.getCustomer(feedback.customer_id)
      .then(customer => feedback.author = createAuthor(customer));
  }
  return Promise.resolve();
};

const attachFeedbacks = impact =>
  FeedbackRepository.getFeedbacksByImpact(impact.id)
    .then(feedbacks => impact.feedbacks = feedbacks)
    .then(() => Promise.mapSeries(impact.feedbacks, attachAuthor));

const attachImpacts = xebian =>
  ImpactRepository.getImpactsByXebian(xebian.id)
    .then(impacts => xebian.impacts = impacts)
    .then(() => Promise.mapSeries(xebian.impacts, attachFeedbacks))
    .then(() => Promise.mapSeries(xebian.impacts, attachCustomer));

const xebian = {
  type: Xebian,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id }) {
    let resultXebian;
    return XebianRepository
      .getXebian(id)
      .then((_xebian) => {
        resultXebian = _xebian;
      })
      .then(() => attachImpacts(resultXebian))
      .then(() => resultXebian);
  },
};

module.exports = { xebians, xebian };
