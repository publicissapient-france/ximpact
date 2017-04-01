const Author = require('./type.author');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const GraphQLJSON = require('graphql-type-json');

const Feedback = new GraphQLObjectType({
  name: 'Feedback',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    comment: {
      type: GraphQLString,
    },
    badges: {
      type: GraphQLJSON,
    },
    created_at: {
      type: GraphQLString,
    },
    updated_at: {
      type: GraphQLString,
    },
    author: {
      type: Author,
    },
  },
});

module.exports = Feedback;
