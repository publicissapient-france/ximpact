const express = require('express');
const graphqlHTTP = require('express-graphql');
const query = require('./queries/customer');
const { GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({ query });

const root = { hello: () => 'Hello world!' };

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
