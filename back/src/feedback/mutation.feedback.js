const Feedback = require('./type.feedback');
const Repository = require('../repository');
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
    impactId: {
      name: 'impactId',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { impactId, comment }) {
    return Repository
      .addFeedback(impactId, comment)
      .then(feedback => feedback.attrs);
  },
};
