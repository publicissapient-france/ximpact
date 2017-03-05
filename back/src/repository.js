const AWS = require('aws-sdk');
const Promise = require('bluebird');
const DynamoCustomer = require('./models/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('./models/dynamo.xebian').DynamoXebian;

AWS.config.setPromisesDependency(Promise);
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

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

  getXebian: (email, firstName) =>
    docClient.get({
      TableName: 'Xebians',
      Key: {
        email,
        firstName,
      },
    }).promise().then(data => data.Item),

  getCustomer: (email, lastName) =>
    Promise.promisify(DynamoCustomer.get)(`${email}_${lastName}`),

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
