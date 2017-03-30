const Feedback = require('./type.feedback');
const FeedbackRepository = require('../feedback/repository.feedback');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const feedback_create = {
  type: Feedback,
  args: {
    xebianId: {
      name: 'xebianId',
      type: new GraphQLNonNull(GraphQLString),
    },
    impactId: {
      name: 'impactId',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { xebianId, impactId }) {
    return FeedbackRepository.addFeedback(xebianId, impactId);
  },
};

const feedback_update = {
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
    comment: {
      name: 'comment',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, customerId, xebianId, impactId, comment }) {
    return FeedbackRepository.getFeedback(xebianId, impactId, customerId, id)
      .then(() => FeedbackRepository.updateFeedback(id, customerId, xebianId, impactId, comment));
  },
};

const feedback_comment = {
  type: Feedback,
  args: {
    id: {
      name: 'id',
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
    customerId: {
      name: 'customerId',
      type: new GraphQLNonNull(GraphQLString),
    },
    text: {
      name: 'text',
      type: new GraphQLNonNull(GraphQLString),
    },
    authorEmail: {
      name: 'authorEmail',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, xebianId, impactId, text, customerId, authorEmail }) {
    return FeedbackRepository.getFeedback(xebianId, impactId, customerId, id)
      .then(() => FeedbackRepository.addComment(id, xebianId, impactId, text, authorEmail));
  },
};

module.exports = { feedback_create, feedback_update, feedback_comment };
