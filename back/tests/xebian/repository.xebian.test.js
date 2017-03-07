const Repository = require('../../src/xebian/repository.xebian');
const DynamoCustomer = require('../../src/customer/dynamo.customer').DynamoCustomer;
const DynamoXebian = require('../../src/xebian/dynamo.xebian').DynamoXebian;
const vogels = require('../../config/vogels');
const Promise = require('bluebird');

const assert = require('assert');
const _ = require('lodash');

describe('Xebian Repository', () => {
  const createTables = (done) => {
    vogels.createTables({
      Xebians: {},
      Customers: {},
    }, done);
  };

  const deleteTables = (done) => {
    const tables = [DynamoCustomer, DynamoXebian];
    Promise
      .mapSeries(tables, table => Promise.promisify(table.deleteTable)())
      .then((deletions) => {
        deletions.forEach((deletion) => {
          const description = deletion.TableDescription;
          console.log(`${description.TableName}: ${description.TableStatus}`);
        });
      })
      .then(done)
      .catch(done);
  };

  before(createTables);

  after(deleteTables);

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

  it('should find xebians by email', (done) => {
    Repository
      .getXebians()
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
