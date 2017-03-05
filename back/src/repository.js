const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();
const put = Promise.promisify(docClient.put).bind(docClient);
const scan = Promise.promisify(docClient.scan).bind(docClient);

module.exports = {

  addCustomer: (company, firstName, lastName, email) =>
    put({
      TableName: 'Customers',
      Item: {
        company,
        firstName,
        lastName,
        email,
      },
      ReturnValues: 'ALL_OLD',
    }).then(data => data.Attributes),

  addXebian: (email, firstName) =>
    put({
      TableName: 'Xebians',
      Item: {
        firstName,
        email,
      },
      ReturnValues: 'ALL_OLD',
    }).then(data => data.Attributes),

  getCustomersByCompany: company =>
    scan({
      TableName: 'Customers',
      ProjectionExpression: 'company, firstName, lastName, email',
      FilterExpression: 'begins_with(company, :company)',
      ExpressionAttributeValues: {
        ':company': company,
      },
    }).then(data => data.Items),

  getXebians: email =>
    scan({
      TableName: 'Xebians',
      ProjectionExpression: 'email, firstName',
      FilterExpression: 'begins_with(email, :email)',
      ExpressionAttributeValues: {
        ':email': email,
      },
    }).then(data => data.Items),

};
