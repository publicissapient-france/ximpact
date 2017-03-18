const Xebian = require('./type.xebian');
const Repository = require('./repository.xebian');
const {
  GraphQLList, GraphQLNonNull, GraphQLString
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

module.exports = { xebians, xebian };
