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
    comment: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: GraphQLString,
    },
  },
});

module.exports = Feedback;
