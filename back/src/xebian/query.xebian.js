const Xebian = require('./type.xebian');
const Repository = require('../repository');
const {
  GraphQLList,
} = require('graphql');

module.exports = {
  type: new GraphQLList(Xebian),
  resolve() {
    return Repository.getXebians();
  },
};
