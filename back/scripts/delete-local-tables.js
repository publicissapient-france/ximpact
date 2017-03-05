const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new AWS.DynamoDB();
const deleteTable = Promise.promisify(dynamodb.deleteTable).bind(dynamodb);
const listTables = Promise.promisify(dynamodb.listTables).bind(dynamodb);

listTables().then(result =>
  Promise
    .mapSeries(result.TableNames, table => {
      console.log(`Deleting ${table} table`);
      return deleteTable({ TableName: table });
    })
    .then(() => console.log('All tables deleted successfully'))
    .catch(console.error));
