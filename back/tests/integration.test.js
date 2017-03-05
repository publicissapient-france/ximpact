'use strict';

const assert = require('assert');
const Promise = this.Promise || require('bluebird');
const request = require('superagent-promise')(require('superagent'), Promise);
const host = 'localhost:' + (process.env.PORT || 4000);

const execute = (fn) =>
  fn
    .end((err) => {
      if (err) {
        console.error(err);
        return Promise.reject(err);
      }
    });

describe('GraphQL', function () {
  before(() => {
    require('../src/index');
  });
  it('should get graphql', (done) => {
    execute(
      request
        .get(`${host}/graphql?{hello}`, { "query": "{\n  hello\n}", "variables": null, "operationName": null }))
      .then((res) => {
        assert.deepEqual(res.body, { "data": { "hello": "Hello World" } });
      })
      .then(done)
      .catch(done);
  });
});
