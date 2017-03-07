const Xebian = require('./type.xebian');
const Repository = require('./repository.xebian');
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

module.exports = {
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
    return Repository
      .addXebian(email, firstName, lastName);
  },
};
