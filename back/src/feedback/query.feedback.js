const Feedback = require('../feedback/type.feedback');
const FeedbackRepository = require('../feedback/repository.feedback');
const {
  GraphQLNonNull, GraphQLString,
} = require('graphql');

const feedback = {
  type: Feedback,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      name: 'customerId',
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      name: 'xebianId',
      type: new GraphQLNonNull(GraphQLString),
    },
    impactId: {
      name: 'impactId',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, customerId, xebianId, impactId }) {
    return FeedbackRepository.getFeedback(xebianId, impactId, customerId, id);
  },
};

module.exports = { feedback };
