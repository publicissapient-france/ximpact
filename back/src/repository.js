const Promise = require('bluebird');
const DynamoCustomer = require('./models/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('./models/dynamo.xebian').DynamoXebian;

module.exports = {

  addCustomer: (company, firstName, lastName, email) =>
    Promise.promisify(DynamoCustomer.create)(
      {
        id: `${company}_${email}`,
        company,
        firstName,
        lastName,
        email,
      }),

  addXebian: (email, firstName, lastName) =>
    Promise.promisify(DynamoXebian.create)(
      {
        id: `${email}_${lastName}`,
        firstName,
        lastName,
        email,
      }),

  getCustomersByCompany: company =>
    new Promise((resolve, reject) => {
      DynamoCustomer.query(company).exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data.Items);
      });
    }),

  getXebians: email =>
    new Promise((resolve, reject) => {
      DynamoXebian.query(email).exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data.Items);
      });
    }),

};
