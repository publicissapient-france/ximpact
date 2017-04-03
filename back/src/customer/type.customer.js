const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const GraphQLDate = require('graphql-date');

const Customer = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    company: {
      type: GraphQLString,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstname: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLDate,
    },
    updated_at: {
      type: GraphQLDate,
    },
  },
});

module.exports = Customer;
