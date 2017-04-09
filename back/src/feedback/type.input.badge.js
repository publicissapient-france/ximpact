const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const Badge = new GraphQLInputObjectType({
  name: 'BadgeInputType',
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
