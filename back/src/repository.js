const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.setPromisesDependency(Promise);
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {

  addCustomer: (company, firstName, lastName, email) =>
    docClient.put({
      TableName: 'Customers',
      Item: {
        company,
        firstName,
        lastName,
        email,
      },
    }).promise(),

  addXebian: (email, firstName) =>
    docClient.put({
      TableName: 'Xebians',
      Item: {
        firstName,
        email,
      },
    }).promise(),

  getXebian: (email, firstName) =>
    docClient.get({
      TableName: 'Xebians',
      Key: {
        email,
        firstName,
      },
    }).promise().then(data => data.Item),

  getCustomer: (email, lastName) =>
    docClient.get({
      TableName: 'Customers',
      Key: {
        email,
        lastName,
      },
    }).promise().then(data => data.Item),

  getCustomersByCompany: company =>
    docClient.scan({
      TableName: 'Customers',
      ProjectionExpression: 'company, firstName, lastName, email',
      FilterExpression: 'begins_with(company, :company)',
      ExpressionAttributeValues: {
        ':company': company,
      },
    }).promise().then(data => data.Items),

  getXebians: email =>
    docClient.scan({
      TableName: 'Xebians',
      ProjectionExpression: 'email, firstName',
      FilterExpression: 'begins_with(email, :email)',
      ExpressionAttributeValues: {
        ':email': email,
      },
    }).promise().then(data => data.Items),

};
