const Promise = require('bluebird');
const DynamoCustomer = require('./dynamo.customer').DynamoCustomer;
const _ = require('lodash');

module.exports = {
  addCustomer: (company, firstName, lastName, email) =>
    Promise.promisify(DynamoCustomer.create)(
      {
        company,
        firstName,
        lastName,
        email,
      }).then(result => result.attrs),

  getCustomers: () =>
    new Promise((resolve, reject) => {
      DynamoCustomer.scan().limit(20).loadAll().exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(_.map(data.Items, item => item.attrs));
      });
    }),
};
