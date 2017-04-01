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
    firstname: {
      name: 'firstname',
      type: GraphQLString,
    },
    lastname: {
      name: 'lastname',
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
    firstname: {
      name: 'firstname',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      name: 'lastname',
      type: new GraphQLNonNull(GraphQLString),
    },
    company: {
      name: 'company',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, company, email, firstname, lastname }) {
    return Repository.getCustomer(id)
      .then(() => Repository.updateCustomer(id, company, firstname, lastname, email));
  },
};

module.exports = { customer_create, customer_update };
