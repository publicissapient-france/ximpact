const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const Customer = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    company: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  },
});

module.exports = Customer;
