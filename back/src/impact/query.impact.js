const Impact = require('../impact/type.impact');
const ImpactRepository = require('../impact/repository.impact');
const CustomerRepository = require('../customer/repository.customer');
const XebianRepository = require('../xebian/repository.xebian');
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
    let dbImpact;
    return ImpactRepository.getImpact(id)
      .then(_impact => dbImpact = _impact)
      .then(() => CustomerRepository.getCustomer(dbImpact.customer_id))
      .then(customer => dbImpact.customer = customer)
      .then(() => XebianRepository.getXebian(dbImpact.xebian_id))
      .then(xebian => dbImpact.xebian = xebian)
      .then(() => dbImpact);
  },
};

module.exports = { impact };
