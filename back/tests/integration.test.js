const assert = require('assert');
const superagent = require('superagent');
const Promise = require('bluebird');
const request = require('superagent-promise')(superagent, Promise);
const _ = require('lodash');
const api = require('./api');
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
    execute(request.get(`${host}/graphql?{hello}`, graphQLQuery))
      .then(res => assert.deepEqual(res.body, { data: { hello: 'Hello World' } }))
      .then(done)
      .catch(done);
  });

  it('should create a feedback', (done) => {
    let customer;
    let xebian;
    let impact;
    execute(request.post(`${host}/graphql?query`, api.createCustomer()))
      .then((res) => {
        customer = res.body.data.customer_create;
        assert.deepEqual(_.omit(customer, ['id']),
          {
            company: 'Dire Straits',
            email: 'mknopfler@direstraits.com',
            firstName: 'Mark',
            lastName: 'Knopfler',
          });
      })
      .then(() => execute(request.post(`${host}/graphql?query`, api.createXebian())))
      .then((res) => {
        xebian = res.body.data.xebian_create;
        assert.deepEqual(_.omit(xebian, ['id']),
          {
            email: 'kcobain@nirvana.com',
            firstName: 'Kurt',
            lastName: 'Cobain',
          });
      })
      .then(() => execute(request.post(`${host}/graphql?query`, api.createImpact(xebian, customer))))
      .then((res) => {
        impact = res.body.data.impact;
        assert.deepEqual(_.omit(impact, ['id']), { description: 'Etre rapide' });
      })
      .then(() => execute(request.post(`${host}/graphql?query`, api.createFeedback(impact, xebian))))
      .then(res => assert.deepEqual(res.body.data.feedback, { comment: 'Super Xebian' }))
      .then(done)
      .catch(done);
  });
});
