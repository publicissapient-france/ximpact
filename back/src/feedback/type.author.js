const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const Author = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstname: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
  },
});

module.exports = Author;
