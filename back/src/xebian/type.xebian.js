const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const Xebian = new GraphQLObjectType({
  name: 'Xebian',
  fields: {
    id: {
      type: GraphQLString,
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

module.exports = Xebian;
