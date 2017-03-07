const Customer = require('./type.customer');
const Repository = require('./repository.customer');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

module.exports = {
  type: Customer,
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      name: 'firstName',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      name: 'lastName',
      type: new GraphQLNonNull(GraphQLString),
    },
    company: {
      name: 'company',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { company, email, firstName, lastName }) {
    return Repository.addCustomer(company, firstName, lastName, email);
  },
};
