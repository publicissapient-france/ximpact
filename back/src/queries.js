const customers = require('./customer/query.customer');
const { xebians, xebian } = require('./xebian/query.xebian');
const { impact } = require('./impact/query.impact');
const { feedback, feedback_by_token } = require('./feedback/query.feedback');
const { GraphQLObjectType } = require('graphql');

const query = new GraphQLObjectType(
  {
    name: 'Query',
    fields: () => ({
      customers,
      xebians,
      xebian,
      feedback,
      feedback_by_token,
      impact,
    }),
  });

module.exports = query;
