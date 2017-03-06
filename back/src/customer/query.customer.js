const Customer = require('./type.customer');
const Repository = require('../repository');
const {
  GraphQLList,
} = require('graphql');

module.exports = {
  type: new GraphQLList(Customer),
  resolve() {
    return Repository.getCustomers();
  },
};
