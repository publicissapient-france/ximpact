const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const Impact = require('../impact/type.impact');

const Xebian = new GraphQLObjectType({
  name: 'Xebian',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    impacts: {
      type: new GraphQLList(Impact),
    },
  },
});

module.exports = Xebian;
