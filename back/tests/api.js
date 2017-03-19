const customer_create = require('require-text')('../queries/customer_create.graphql', require);
const customer_update = require('require-text')('../queries/customer_update.graphql', require);
const customers_find = require('require-text')('../queries/customers_find.graphql', require);
const xebian_create = require('require-text')('../queries/xebian_create.graphql', require);
const xebian_update = require('require-text')('../queries/xebian_update.graphql', require);
const xebians_find = require('require-text')('../queries/xebians_find.graphql', require);
const xebian_find = require('require-text')('../queries/xebian_find.graphql', require);
const impact_find = require('require-text')('../queries/impact_find.graphql', require);
const feedback_find = require('require-text')('../queries/feedback_find.graphql', require);
const impact_create = require('require-text')('../queries/impact_create.graphql', require);
const feedback_create = require('require-text')('../queries/feedback_create.graphql', require);
const feedback_update = require('require-text')('../queries/feedback_update.graphql', require);

const Handlebars = require('handlebars');

module.exports = {
  createCustomer: () => ({ query: customer_create }),

  createXebian: () => ({ query: xebian_create }),

  createImpact: (xebian, customer) => ({
    query: Handlebars.compile(impact_create)({
      xebianId: xebian.id,
      customerId: customer.id,
    }),
  }),

  createFeedback: (impact, xebian) => ({
    query: Handlebars.compile(feedback_create)({
      impactId: impact.id,
      xebianId: xebian.id,
    }),
  }),

  updateFeedback: (impact, xebian, feedback, customer) => ({
    query: Handlebars.compile(feedback_update)({
      impactId: impact.id,
      xebianId: xebian.id,
      feedbackId: feedback.id,
      customerId: customer.id,
    }),
  }),

  getCustomers: () => ({ query: customers_find }),

  getXebians: () => ({ query: xebians_find }),

  getXebianById: id => ({ query: Handlebars.compile(xebian_find)({ id }) }),

  getFeedbackById: (id, impactId, customerId, xebianId) => ({
    query: Handlebars.compile(feedback_find)({
      id,
      impactId,
      customerId,
      xebianId,
    }),
  }),

  getImpactById: (id, customerId, xebianId) => ({
    query: Handlebars.compile(impact_find)({
      id,
      customerId,
      xebianId,
    }),
  }),

  updateXebian: id => ({
    query: Handlebars.compile(xebian_update)({ id }),
  }),

  updateCustomer: id => ({
    query: Handlebars.compile(customer_update)({ id }),
  }),

};
