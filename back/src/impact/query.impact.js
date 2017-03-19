const Impact = require('../impact/type.impact');
const ImpactRepository = require('../impact/repository.impact');
const CustomerRepository = require('../customer/repository.customer');
const {
  GraphQLNonNull, GraphQLString,
} = require('graphql');

const impact = {
  type: Impact,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      name: 'customerId',
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      name: 'xebianId',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, customerId, xebianId }) {
    return ImpactRepository.getImpact(xebianId, customerId, id)
      .then(_impact => CustomerRepository.getCustomer(customerId)
        .then(customer => _impact.customer = customer)
        .then(() => _impact));
  },
};

module.exports = { impact };
