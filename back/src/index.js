const express = require('express');
const graphqlHTTP = require('express-graphql');
const query = require('./queries');
const mutation = require('./mutations');
const {GraphQLSchema} = require('graphql');

const schema = new GraphQLSchema({query, mutation});

const root = {hello: () => 'Hello world!'};

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'));
