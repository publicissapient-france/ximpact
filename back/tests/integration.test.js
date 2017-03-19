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
    .end()
    .then((res) => {
      if (res.body.errors) {
        throw new Error(res.body.errors[0].message);
      }
      return Promise.resolve(res);
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

  it('should do the full process', (done) => {
    let customer;
    let xebian;
    let impact;
    let feedback;

    // Le commercial rencontre le client et crée sa fiche
    execute(request.post(`${host}/graphql?query`, api.createCustomer()))
      .then(res => customer = res.body.data.customer_create)
      .then(() =>
        assert.deepEqual(_.omit(customer, ['id']), { email: 'mknopfler@direstraits.com' }))

      // C'est un nouveau Xebian qui sera en mission, il crée également sa fiche
      .then(() => execute(request.post(`${host}/graphql?query`, api.createXebian())))
      .then(res => xebian = res.body.data.xebian_create)
      .then(() => assert.deepEqual(_.pick(xebian, ['email']), { email: 'kcobain@nirvana.com' }))

      // Une fois l'impact discuté avec le client et le xebian, on crée l'impact
      .then(() => execute(request.post(`${host}/graphql?query`, api.createImpact(xebian, customer))))
      .then(res => impact = res.body.data.impact)
      .then(() => assert.deepEqual(_.omit(impact, ['id']), {
        description: 'Etre rapide',
        xebianId: xebian.id,
        customerId: customer.id,
      }))

      // Un mois plus tard, le cron crée le feedback et envoie un mail
      // contenant un lien (xebianId, customerId, feedbackId, impactId)
      .then(() => execute(request.post(`${host}/graphql?query`, api.createFeedback(impact, xebian))))
      .then(res => feedback = res.body.data.feedback_create)
      .then(() => assert.deepEqual(_.omit(feedback, ['id', 'createdAt']), {
        xebianId: xebian.id,
        customerId: customer.id,
        impactId: impact.id,
      }))

      // Le client renseigne son commentaire de feedback
      .then(() => execute(request.post(`${host}/graphql?query`, api.updateFeedback(impact, xebian, feedback, customer))))
      .then(res => feedback = res.body.data.feedback_update)
      .then(() => assert.deepEqual(_.omit(feedback, ['id', 'createdAt', 'updatedAt']), {
        comment: 'Excellent mois!',
        xebianId: xebian.id,
        customerId: customer.id,
        impactId: impact.id,
      }))
      .then(done)
      .catch(done);
  });
});
