const Feedback = require('./type.feedback');
const BadgeInputType = require('./type.input.badge');
const FeedbackRepository = require('../feedback/repository.feedback');
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const feedback_create = {
  type: Feedback,
  args: {
    xebianId: {
      name: 'xebianId',
      type: new GraphQLNonNull(GraphQLString),
    },
    comment: {
      name: 'comment',
      type: new GraphQLNonNull(GraphQLString),
    },
    impactId: {
      name: 'impactId',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { xebianId, impactId, comment }) {
    return FeedbackRepository.addFeedback(impactId, comment, undefined, xebianId);
  },
};

const feedback_update = {
  type: Feedback,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    comment: {
      name: 'comment',
      type: new GraphQLNonNull(GraphQLString),
    },
    badges: {
      name: 'badges',
      type: new GraphQLList(BadgeInputType),
    },
  },
  resolve(obj, { id, comment, badges }) {
    return FeedbackRepository.updateFeedback(id, comment, badges);
  },
};

module.exports = { feedback_create, feedback_update };
