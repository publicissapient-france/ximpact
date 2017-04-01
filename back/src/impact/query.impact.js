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
  },
  resolve(obj, { id }) {
    return ImpactRepository.getImpact(id)
      .then(_impact => CustomerRepository.getCustomer(_impact.customer_id)
        .then(customer => _impact.customer = customer)
        .then(() => _impact));
  },
};

module.exports = { impact };
