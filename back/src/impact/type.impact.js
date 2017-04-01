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
    xebian_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    customer: {
      type: new GraphQLNonNull(Customer),
    },
    feedbacks: {
      type: new GraphQLList(Feedback),
    },
    created_at: {
      type: GraphQLString,
    },
    updated_at: {
      type: GraphQLString,
    },
  },
});

module.exports = Impact;
