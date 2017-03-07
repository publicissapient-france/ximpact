const Database = require('../database');
const Repository = require('../../src/xebian/repository.xebian');

const assert = require('assert');
const _ = require('lodash');

describe('Xebian Repository', () => {
  before(Database.createTables);

  after(Database.deleteTables);

  it('should add a xebian', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then((xebian) => {
        assert.deepEqual(_.omit(xebian, ['createdAt', 'id']),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            lastName: 'Smadja',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should add an impact', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then(xebian => Repository.addImpact(xebian.id, 'customerId', 'Faire un BBL par mois'))
      .then(xebian => assert.deepEqual(_.omit(xebian, ['createdAt', 'updatedAt', 'id']), { description: 'Faire un BBL par mois' }))
      .then(done)
      .catch(done);
  });

  it('should add a feedback', (done) => {
    let xebianId;
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then((xebian) => {
        xebianId = xebian.id;
        return xebian;
      })
      .then(xebian => Repository.addImpact(xebian.id, 'customerId', 'Faire un BBL par mois'))
      .then(impact => Repository.addFeedback(xebianId, impact.id, 'Super!'))
      .then(feedback => assert.deepEqual(_.omit(feedback, ['createdAt', 'id']), { comment: 'Super!' }))
      .then(done)
      .catch(done);
  });

  it('should find all xebians', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr', 'Julien', 'Smadja')
      .then(() => Repository.getXebians())
      .then((xebians) => {
        assert.deepEqual(_.omit(xebians[0], ['createdAt', 'id', 'impacts', 'updatedAt']),
          {
            email: 'jsmadja@xebia.fr',
            firstName: 'Julien',
            lastName: 'Smadja',
          });
      })
      .then(done)
      .catch(done);
  });
});
