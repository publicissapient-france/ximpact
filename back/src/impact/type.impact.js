const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const Feedback = require('../feedback/type.feedback');

const Impact = new GraphQLObjectType({
  name: 'Impact',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    feedbacks: {
      type: new GraphQLList(Feedback),
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

module.exports = Impact;
