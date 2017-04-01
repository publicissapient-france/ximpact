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
  },
  resolve(obj, { email }) {
    return Repository.addXebian(email);
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
    firstname: {
      name: 'firstname',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      name: 'lastname',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(obj, { id, email, firstname, lastname }) {
    return Repository.getXebian(id).then(() =>
      Repository.updateXebian(id, firstname, lastname, email));
  },
};

module.exports = { xebian_create, xebian_update };
