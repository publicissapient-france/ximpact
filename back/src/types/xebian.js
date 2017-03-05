const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const Xebian = new GraphQLObjectType({
  name: 'Xebian',
  fields: {
    email: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
  },
});

module.exports = Xebian;
