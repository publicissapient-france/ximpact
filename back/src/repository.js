const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();
const put = Promise.promisify(docClient.put).bind(docClient);
const query = Promise.promisify(docClient.query).bind(docClient);

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
    }),

  listTables,

  addCustomer: (company, firstName, lastName, email) => put({
    TableName: 'Customers',
    Item: {
      company,
      firstName,
      lastName,
      email,
    },
    ReturnValues: 'ALL_OLD',
  }),

  getCustomersByCompany: company =>
    query({
      TableName: 'Customers',
      ProjectionExpression: '#company, firstName, lastName, email',
      KeyConditionExpression: '#company = :company',
      ExpressionAttributeNames: {
        '#company': 'company',
      },
      ExpressionAttributeValues: {
        ':company': company,
      },
    }),

};
