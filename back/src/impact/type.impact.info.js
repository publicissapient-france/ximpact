const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const GraphQLDate = require('graphql-date');

const ImpactInfo = new GraphQLObjectType({
  name: 'ImpactInfo',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    created_at: {
      type: GraphQLDate,
    },
    updated_at: {
      type: GraphQLDate,
    },
  },
});

module.exports = ImpactInfo;
