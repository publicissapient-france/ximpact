const customers = require('./customer/query.customer');
const { xebians, xebian } = require('./xebian/query.xebian');
const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const query = new GraphQLObjectType(
  {
    name: 'Query',
    fields: () => ({
      customers,
      xebians,
      xebian,
      hello: {
        type: GraphQLString,
        resolve() {
          return 'Hello World';
        },
      },
    }),
  });

module.exports = query;
