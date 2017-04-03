const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const Impact = require('../impact/type.impact');
const GraphQLDate = require('graphql-date');

const Xebian = new GraphQLObjectType({
  name: 'Xebian',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstname: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
    impacts: {
      type: new GraphQLList(Impact),
    },
    created_at: {
      type: GraphQLDate,
    },
    updated_at: {
      type: GraphQLDate,
    },
  },
});

module.exports = Xebian;
