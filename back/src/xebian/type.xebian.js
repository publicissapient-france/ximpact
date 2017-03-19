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
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    impacts: {
      type: new GraphQLList(Impact),
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

module.exports = Xebian;
