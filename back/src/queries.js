const customers = require('./customer/query.customer');
const xebians = require('./xebian/query.xebian');
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
      hello: {
        type: GraphQLString,
        resolve() {
          return 'Hello World';
        },
      },
    }),
  });

module.exports = query;
