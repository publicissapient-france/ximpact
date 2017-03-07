const Promise = require('bluebird');
const DynamoCustomer = require('./customer/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('./xebian/dynamo.xebian').DynamoXebian;
const DynamoImpact = require('./impact/dynamo.impact').DynamoImpact;
const DynamoFeedback = require('./feedback/dynamo.feedback').DynamoFeedback;
const _ = require('lodash');

module.exports = {

  addCustomer: (company, firstName, lastName, email) =>
    Promise.promisify(DynamoCustomer.create)(
      {
        company,
        firstName,
        lastName,
        email,
      }),

  addXebian: (email, firstName, lastName) =>
    Promise.promisify(DynamoXebian.create)(
      {
        firstName,
        lastName,
        email,
      }),

  addImpact: (xebianId, customerId, description) =>
    Promise.promisify(DynamoImpact.create)(
      {
        description,
        xebianId,
        customerId,
      }),

  addFeedback: (impactId, comment) =>
    Promise.promisify(DynamoFeedback.create)(
      {
        comment,
        impactId,
      }),

  getCustomers: () =>
    new Promise((resolve, reject) => {
      DynamoCustomer.scan().limit(20).loadAll().exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(_.map(data.Items, item => item.attrs));
      });
    }),

  getXebians: () =>
    new Promise((resolve, reject) => {
      DynamoXebian.scan().limit(20).loadAll().exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(_.map(data.Items, item => item.attrs));
      });
    }),

};
