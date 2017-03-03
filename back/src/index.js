const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const dyn = new AWS.DynamoDB();
dyn.listTables((err, data) => {
  console.log('listTables', err, data);
});

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
