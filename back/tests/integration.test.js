const assert = require('assert');
const superagent = require('superagent');
const Promise = require('bluebird');
const request = require('superagent-promise')(superagent, Promise);
require('../src/index');

const host = 'localhost:4000';

const execute = fn =>
  fn
    .end((err) => {
      if (err) {
        console.error(err);
        return Promise.reject(err);
      }
      return Promise.resolve();
    });

describe('GraphQL', () => {
  it('should get graphql', (done) => {
    const graphQLQuery = {
      query: '{ hello }',
    };
    execute(
      request
        .get(`${host}/graphql?{hello}`, graphQLQuery))
      .then(res => assert.deepEqual(res.body, { data: { hello: 'Hello World' } }))
      .then(done)
      .catch(done);
  });
});
