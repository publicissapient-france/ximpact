const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const Comment = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    text: {
      type: GraphQLString,
    },
    authorEmail: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
  },
});

module.exports = Comment;
