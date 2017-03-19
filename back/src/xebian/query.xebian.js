const Xebian = require('./type.xebian');
const Feedback = require('../feedback/type.feedback');
const Impact = require('../impact/type.impact');
const Repository = require('./repository.xebian');
const {
  GraphQLList, GraphQLNonNull, GraphQLString,
} = require('graphql');

const xebians = {
  type: new GraphQLList(Xebian),
  resolve() {
    return Repository.getXebians();
  },
};

const xebian = {
  type: Xebian,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id }) {
    return Repository.getXebian(id);
  },
};

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
    return Repository.getFeedback(xebianId, impactId, customerId, id);
  },
};

const impact = {
  type: Impact,
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
  },
  resolve(obj, { id, customerId, xebianId }) {
    return Repository.getImpact(xebianId, customerId, id);
  },
};

module.exports = { xebians, xebian, feedback, impact };
