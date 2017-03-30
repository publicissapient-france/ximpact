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
      return Promise.resolve(res.body.data);
    });

const graphql = query => execute(request.post(`${host}/graphql?query`, query));

describe('GraphQL', () => {
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
      .then(data => impact = data.impact)
      .then(() => {
        assert.deepEqual(_.omit(impact, ['id', 'customer']), {
          description: 'Etre rapide',
          xebianId: xebian.id,
        });
        assert.equal(impact.customer.id, customer.id);
      })

      // Un mois plus tard, le cron crée le feedback et envoie un mail
      // contenant un lien (xebianId, customerId, feedbackId, impactId)
      .then(() => graphql(api.createFeedback(impact, xebian)))
      .then(data => feedback = data.feedback_create)
      .then(() => assert.deepEqual(_.omit(feedback, ['id', 'createdAt']), {
        xebianId: xebian.id,
        customerId: customer.id,
        impactId: impact.id,
      }))

      // Le client renseigne son commentaire de feedback
      .then(() => graphql(api.updateFeedback(impact, xebian, feedback, customer)))
      .then(data => feedback = data.feedback_update)
      .then(() => assert.deepEqual(_.omit(feedback, ['id', 'createdAt', 'updatedAt']), {
        comment: 'OKAY',
        xebianId: xebian.id,
        customerId: customer.id,
        impactId: impact.id,
      }))

      // Le xebian ajoute un commentaire au feedback
      .then(() => graphql(api.commentFeedback(impact, xebian, feedback, customer)))
      .then(data => feedback = data.feedback_comment)
      .then(() => assert.deepEqual(_.omit(feedback.comments[0], ['id', 'createdAt']), {
        text: 'd\'accord avec le client!',
        authorEmail: 'jsmadja@xebia.fr',
      }))

      // Listes
      .then(() => graphql(api.getCustomers()))
      .then(() => graphql(api.getXebians()))

      // ById
      .then(() => graphql(api.getXebianById(xebian.id)))
      .then(data => assert.deepEqual(_.omit(data.xebian, ['impacts', 'firstName', 'lastName']), xebian))
      .then(() => graphql(api.getFeedbackById(feedback.id, impact.id, customer.id, xebian.id)))
      .then(data => assert.deepEqual(_.omit(data.feedback, ['updatedAt']), _.omit(feedback, ['updatedAt', 'comments'])))
      .then(() => graphql(api.getImpactById(impact.id, customer.id, xebian.id)))
      .then(data => assert.deepEqual(_.omit(data.impact, ['createdAt', 'updatedAt']), _.omit(impact, ['createdAt'])))

      // Updates
      .then(() => graphql(api.updateXebian(xebian.id)))
      .then(data => assert.deepEqual(_.omit(data.xebian_update, ['impacts', 'firstName', 'lastName']), xebian))

      .then(() => graphql(api.updateCustomer(customer.id)))
      .then(data => assert.deepEqual(_.omit(data.customer_update, ['company', 'firstName', 'lastName']), customer))

      .then(() => done())
      .catch(done);
  });
});
