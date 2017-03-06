const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const Impact = new GraphQLObjectType({
  name: 'Impact',
  fields: {
    description: {
      type: GraphQLString,
    },
  },
});

module.exports = Impact;
