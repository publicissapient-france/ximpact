const Feedback = require('./type.feedback');
const Repository = require('../xebian/repository.xebian');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const feedback_create = {
  type: Feedback,
  args: {
    comment: {
      name: 'comment',
      type: GraphQLString,
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
  resolve(obj, { xebianId, impactId, comment }) {
    return Repository.addFeedback(xebianId, impactId, comment);
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
    return Repository.getFeedback(xebianId, impactId, customerId, id)
      .then(feedback => Repository.updateFeedback(id, customerId, xebianId, impactId, comment))
  },
};


module.exports = {feedback_create, feedback_update};
