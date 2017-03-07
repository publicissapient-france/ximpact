const Customer = require('./type.customer');
const Repository = require('./repository.customer');
const {
  GraphQLList,
} = require('graphql');

module.exports = {
  type: new GraphQLList(Customer),
  resolve() {
    return Repository.getCustomers();
  },
};
