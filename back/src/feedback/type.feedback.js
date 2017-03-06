const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const Feedback = new GraphQLObjectType({
  name: 'Feedback',
  fields: {
    comment: {
      type: GraphQLString,
    },
  },
});

module.exports = Feedback;
