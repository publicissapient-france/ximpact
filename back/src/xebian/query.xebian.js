const Xebian = require('./type.xebian');
const Repository = require('./repository.xebian');
const {
  GraphQLList,
} = require('graphql');

module.exports = {
  type: new GraphQLList(Xebian),
  resolve() {
    return Repository.getXebians();
  },
};
