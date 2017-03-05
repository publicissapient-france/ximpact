const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new AWS.DynamoDB();
const createTable = Promise.promisify(dynamodb.createTable).bind(dynamodb);

const tables = [
  {
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
  },
  {
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
  },
];

Promise
  .mapSeries(tables, (table) => {
    console.log(`Creating ${table.TableName} table`);
    return createTable(table);
  })
  .then(() => console.log('All tables created successfully'))
  .catch(console.error);
