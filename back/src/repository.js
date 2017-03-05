const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();
const put = Promise.promisify(docClient.put).bind(docClient);
const scan = Promise.promisify(docClient.scan).bind(docClient);

const dynamodb = new AWS.DynamoDB();
const createTable = Promise.promisify(dynamodb.createTable).bind(dynamodb);
const deleteTable = Promise.promisify(dynamodb.deleteTable).bind(dynamodb);
const listTables = Promise.promisify(dynamodb.listTables).bind(dynamodb);

module.exports = {

  dropTables: () =>
    listTables()
      .then(result =>
        Promise.mapSeries(result.TableNames, table => deleteTable({ TableName: table }))),

  createTables: () =>
    createTable({
      TableName: 'Customers',
      KeySchema: [
        { AttributeName: 'company', KeyType: 'HASH' },
        { AttributeName: 'lastName', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'company', AttributeType: 'S' },
        { AttributeName: 'lastName', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    })
      .then(() => createTable({
        TableName: 'Xebians',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' },
          { AttributeName: 'firstName', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'email', AttributeType: 'S' },
          { AttributeName: 'firstName', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      }))
      .catch(console.error),

  listTables,

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
