const Xebian = require('./type.xebian');
const Repository = require('./repository.xebian');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const xebian_create = {
  type: Xebian,
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      name: 'firstName',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      name: 'lastName',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { email, firstName, lastName }) {
    return Repository.addXebian(email, firstName, lastName);
  },
};

const xebian_update = {
  type: Xebian,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      name: 'firstName',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      name: 'lastName',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, email, firstName, lastName }) {
    return Repository.getXebian(id).then(() =>
      Repository.updateXebian(id, firstName, lastName, email));
  },
};

module.exports = { xebian_create, xebian_update };
