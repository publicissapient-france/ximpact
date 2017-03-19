const Xebian = require('./type.xebian');
const XebianRepository = require('./repository.xebian');
const CustomerRepository = require('../customer/repository.customer');
const Promise = require('bluebird');

const {
  GraphQLList, GraphQLNonNull, GraphQLString,
} = require('graphql');

const xebians = {
  type: new GraphQLList(Xebian),
  resolve() {
    return XebianRepository.getXebians();
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
    let resultXebian;
    return XebianRepository
      .getXebian(id)
      .then((_xebian) => {
        resultXebian = _xebian;
        return Promise.mapSeries(resultXebian.impacts,
          impact =>
            CustomerRepository
              .getCustomer(impact.customerId)
              .then(customer => impact.customer = customer));
      })
      .then(() => resultXebian);
  },
};

module.exports = { xebians, xebian };
