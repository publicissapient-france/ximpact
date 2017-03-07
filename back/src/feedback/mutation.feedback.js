const Feedback = require('./type.feedback');
const Repository = require('../xebian/repository.xebian');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

module.exports = {
  type: Feedback,
  args: {
    comment: {
      name: 'comment',
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
  resolve(obj, { xebianId, impactId, comment }) {
    return Repository.addFeedback(xebianId, impactId, comment);
  },
};
