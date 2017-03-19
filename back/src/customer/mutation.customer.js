const Customer = require('./type.customer');
const Repository = require('./repository.customer');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const customer_create = {
  type: Customer,
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      name: 'firstName',
      type: GraphQLString,
    },
    lastName: {
      name: 'lastName',
      type: GraphQLString,
    },
    company: {
      name: 'company',
      type: GraphQLString,
    },
  },
  resolve(obj, { email }) {
    return Repository.addCustomer(email);
  },
};

const customer_update = {
  type: Customer,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
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
  resolve(obj, { id, company, email, firstName, lastName }) {
    return Repository.getCustomer(id)
      .then(() => Repository.updateCustomer(id, company, firstName, lastName, email));
  },
};

module.exports = { customer_create, customer_update };
