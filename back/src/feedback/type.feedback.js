const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const Feedback = new GraphQLObjectType({
  name: 'Feedback',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    impactId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    comment: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

module.exports = Feedback;
