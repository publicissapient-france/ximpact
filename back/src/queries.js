const customers = require('./customer/query.customer');
const { xebians, xebian } = require('./xebian/query.xebian');
const { impact } = require('./impact/query.impact');
const { feedback } = require('./feedback/query.feedback');
const { GraphQLObjectType } = require('graphql');

const query = new GraphQLObjectType(
  {
    name: 'Query',
    fields: () => ({
      customers,
      xebians,
      xebian,
      feedback,
      impact,
    }),
  });

module.exports = query;
