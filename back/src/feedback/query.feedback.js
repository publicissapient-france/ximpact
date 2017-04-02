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
  },
  resolve(obj, { id }) {
    return FeedbackRepository.getFeedback(id);
  },
};

const feedback_by_token = {
  type: Feedback,
  args: {
    token: {
      name: 'token',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { token }) {
    return FeedbackRepository.getFeedbackByToken(token);
  },
};

module.exports = { feedback, feedback_by_token };
