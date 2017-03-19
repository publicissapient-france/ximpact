const assert = require('assert');
const Repository = require('../../src/xebian/repository.xebian');
const _ = require('lodash');

describe('Xebian Repository', () => {
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

  it('should update a xebian', (done) => {
    Repository
      .addXebian('lfontania@xebia.fr', 'Laxime', 'Fontania')
      .then(xebian => Repository.updateXebian(xebian.id, 'Naxime', 'Pontania', 'npontania@zelia.fr'))
      .then((customer) => {
        assert.deepEqual(_.omit(customer, ['createdAt', 'updatedAt', 'id']),
          {
            email: 'npontania@zelia.fr',
            firstName: 'Naxime',
            lastName: 'Pontania',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should find a xebian by id', (done) => {
    Repository
      .addXebian('psmadja@xebia.fr', 'Pulien', 'Smadja')
      .then(xebian => Repository.getXebian(xebian.id))
      .then(xebian => assert.equal(xebian.email, 'psmadja@xebia.fr'))
      .then(done)
      .catch(done);
  });

  it('should find all xebians', (done) => {
    Repository
      .addXebian('xsmadja@xebia.fr', 'Xulien', 'Smadja')
      .then(() => Repository.getXebians())
      .then((xebians) => {
        const filtered = _(xebians).filter(xebian => xebian.email === 'xsmadja@xebia.fr').value();
        assert.equal(filtered.length, 1);
      })
      .then(done)
      .catch(done);
  });
});
