const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const Impact = new GraphQLObjectType({
  name: 'Impact',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = Impact;
