const Impact = require('./type.impact');
const ImpactRepository = require('../impact/repository.impact');
const CustomerRepository = require('../customer/repository.customer');
const XebianRepository = require('../xebian/repository.xebian');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

module.exports = {
  type: Impact,
  args: {
    description: {
      name: 'description',
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      name: 'xebianId',
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      name: 'customerId',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { xebianId, customerId, description }) {
    let impact;
    return ImpactRepository.addImpact(xebianId, customerId, description)
      .then(_impact => impact = _impact)
      .then(() => CustomerRepository.getCustomer(customerId))
      .then(customer => impact.customer = customer)
      .then(() => XebianRepository.getXebian(impact.xebian_id))
      .then(xebian => impact.xebian = xebian)
      .then(() => impact);
  },
};
