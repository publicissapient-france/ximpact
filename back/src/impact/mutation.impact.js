const Impact = require('./type.impact');
const Repository = require('../repository');
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
    return Repository
      .addImpact(xebianId, customerId, description)
      .then(impact => impact.attrs);
  },
};
