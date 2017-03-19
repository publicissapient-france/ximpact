const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const Feedback = require('../feedback/type.feedback');
const Customer = require('../customer/type.customer');

const Impact = new GraphQLObjectType({
  name: 'Impact',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    customer: {
      type: new GraphQLNonNull(Customer),
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
