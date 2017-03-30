const { xebian_create, xebian_update } = require('./xebian/mutation.xebian');
const { customer_create, customer_update } = require('./customer/mutation.customer');
const impact = require('./impact/mutation.impact');
const { feedback_create, feedback_update, feedback_comment } = require('./feedback/mutation.feedback');
const {
  GraphQLObjectType,
} = require('graphql');

const mutation = new GraphQLObjectType(
  {
    name: 'Mutation',
    fields: () => ({
      xebian_create,
      xebian_update,
      customer_create,
      customer_update,
      impact,
      feedback_create,
      feedback_update,
      feedback_comment,
    }),
  });

module.exports = mutation;
