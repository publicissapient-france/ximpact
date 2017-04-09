const assert = require('assert');
const superagent = require('superagent');
const Promise = require('bluebird');
const request = require('superagent-promise')(superagent, Promise);
const _ = require('lodash');
const api = require('./api');
const FeedbackRepository = require('../src/feedback/repository.feedback');
require('../src/index');

const host = 'localhost:4000';

const execute = fn =>
  fn
    .end()
    .then((res) => {
      if (res.body.errors) {
        console.log(res);
        throw new Error(res.body.errors[0].message);
      }
      return Promise.resolve(res.body.data);
    });

const graphql = (query) => {
  console.log(`
================

${query.query}`);
  return execute(request.post(`${host}/graphql?query`, query))
    .then((res) => {
      console.log(res);
      return res;
    });
};

describe.only('GraphQL', () => {
  it('should do the full process', (done) => {
    let customer;
    let xebian;
    let impact;
    let feedback;

    // Le commercial rencontre le client et crée sa fiche
    graphql(api.createCustomer())
      .then(data => customer = data.customer_create)
      .then(() =>
        assert.deepEqual(_.omit(customer, ['id']), { email: 'mknopfler@direstraits.com' }))

      // C'est un nouveau Xebian qui sera en mission, il crée également sa fiche
      .then(() => graphql(api.createXebian()))
      .then(data => xebian = data.xebian_create)
      .then(() => assert.deepEqual(_.pick(xebian, ['email']), { email: 'kurt.cobain@nirvana.com' }))

      // Une fois l'impact discuté avec le client et le xebian, on crée l'impact
      .then(() => graphql(api.createImpact(xebian, customer)))
      .then(data => impact = data.impact_create)
      .then(() => {
        assert.deepEqual(_.omit(impact, ['id', 'customer', 'xebian']), { description: 'Etre rapide' });
        assert.equal(impact.customer.id, customer.id);
        assert.equal(impact.xebian.id, xebian.id);
      })
      // Un mois plus tard, le cron crée le feedback et envoie un mail
      // contenant un lien avec un token
      .then(() => graphql(api.createFeedback(impact, xebian)))
      .then(data => feedback = data.feedback_create)
      .then(() => assert.ok(feedback.id))

      .then(() => FeedbackRepository.createToken(feedback))
      .then(token => graphql(api.getFeedbackByToken(token)))
      .then(_feedback => assert.equal(feedback.id, _feedback.feedback_by_token.id))

      // Le client renseigne son commentaire de feedback
      .then(() => graphql(api.updateFeedback(feedback)))
      .then(data => feedback = data.feedback_update)
      .then(() => assert.deepEqual(_.pick(feedback, ['comment']), {
        comment: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      }))

      // Le xebian ajoute un commentaire au feedback
      .then(() => graphql(api.addFeedback(impact, xebian)))
      .then(data => feedback = data.feedback_create)
      .then(() => assert.ok(feedback.id))

      // Listes
      .then(() => graphql(api.getCustomers()))
      .then(() => graphql(api.getXebians()))

      // ById
      .then(() => graphql(api.getXebianById(xebian.id)))
      .then(data => assert.deepEqual(_.omit(data.xebian, ['impacts', 'firstname', 'lastname']), xebian))
      .then(() => graphql(api.getFeedbackById(feedback.id, impact.id, customer.id, xebian.id)))
      .then(data => assert.deepEqual(_.pick(data.feedback, ['id']), _.pick(feedback, ['id'])))
      .then(() => graphql(api.getImpactById(impact.id, customer.id, xebian.id)))
      .then(data => assert.deepEqual(_.pick(data.impact, ['id']), _.pick(impact, ['id'])))

      // Updates
      .then(() => graphql(api.updateXebian(xebian.id)))
      .then(data => assert.deepEqual(_.omit(data.xebian_update, ['impacts', 'firstname', 'lastname']), xebian))

      .then(() => graphql(api.updateCustomer(customer.id)))
      .then(data => assert.deepEqual(_.omit(data.customer_update, ['company', 'firstname', 'lastname']), customer))

      .then(() => done())
      .catch(done);
  });
});
