const xebian = require('./xebian/mutation.xebian');
const customer = require('./customer/mutation.customer');
const impact = require('./impact/mutation.impact');
const feedback = require('./feedback/mutation.feedback');
const {
  GraphQLObjectType,
} = require('graphql');

const mutation = new GraphQLObjectType(
  {
    name: 'Mutation',
    fields: () => ({
      xebian,
      customer,
      impact,
      feedback,
    }),
  });

module.exports = mutation;
