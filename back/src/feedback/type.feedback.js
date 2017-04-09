const XebianInfo = require('../xebian/type.xebian.info');
const Customer = require('../customer/type.customer');
const ImpactInfo = require('../impact/type.impact.info');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const GraphQLDate = require('graphql-date');

const Feedback = new GraphQLObjectType({
  name: 'Feedback',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    impact: {
      type: ImpactInfo,
    },
    comment: {
      type: GraphQLString,
    },
    badges: {
      type: GraphQLJSON,
    },
    created_at: {
      type: GraphQLDate,
    },
    updated_at: {
      type: GraphQLDate,
    },
    customer: {
      type: Customer,
    },
    xebian: {
      type: XebianInfo,
    },
    customer_author: {
      type: Customer,
    },
    xebian_author: {
      type: XebianInfo,
    },
  },
});

module.exports = Feedback;
