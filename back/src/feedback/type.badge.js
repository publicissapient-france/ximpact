const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const Badge = new GraphQLObjectType({
  name: 'Badge',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      type: GraphQLBoolean,
    },
  },
});

module.exports = Badge;
