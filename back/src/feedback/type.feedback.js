const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const Comment = require('./type.comment');

const Feedback = new GraphQLObjectType({
  name: 'Feedback',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    xebianId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    customerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    impactId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    comment: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
    comments: {
      type: new GraphQLList(Comment),
    },
  },
});

module.exports = Feedback;
