const Customer = require('./types/customer');
const Xebian = require('./types/xebian');
const Repository = require('./repository');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const query = new GraphQLObjectType(
  {
    name: 'Query',
    fields: () => ({
      customers: {
        type: new GraphQLList(Customer),
        args: {
          company: {
            name: 'company',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          return Repository.getCustomersByCompany(params.company);
        },
      },
      xebians: {
        type: new GraphQLList(Xebian),
        args: {
          email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          return Repository.getXebians(params.email);
        },
      },
      hello: {
        type: GraphQLString,
        resolve() {
          return 'Hello World';
        }
      }
    }),
  });

module.exports = query;
