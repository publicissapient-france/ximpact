const Customer = require('../types/customer');
const Repository = require('../repository');

const {
  GraphQLObjectType,
} = require('graphql');

const query = new GraphQLObjectType({
  name: 'CustomerQuery',
  fields: () => ({
    customer: {
      type: Customer,
      resolve() {
        return Repository.getCustomersByCompany('company').then(customers => customers.Items[0]);
      },
    },
  }),
});

module.exports = query;
