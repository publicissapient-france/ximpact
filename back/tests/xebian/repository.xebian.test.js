const assert = require('assert');
const Repository = require('../../src/xebian/repository.xebian');
const _ = require('lodash');

describe('Xebian Repository', () => {
  it('should add a xebian', (done) => {
    Repository
      .addXebian('jsmadja@xebia.fr')
      .then((xebian) => {
        assert.deepEqual(_.pick(xebian, ['email']), { email: 'jsmadja@xebia.fr' });
      })
      .then(done)
      .catch(done);
  });

  it('should update a xebian', (done) => {
    Repository
      .addXebian('lfontania@xebia.fr')
      .then(xebian => Repository.updateXebian(xebian.id, 'Naxime', 'Pontania', 'npontania@zelia.fr'))
      .then((customer) => {
        assert.deepEqual(_.omit(customer, ['created_at', 'updated_at', 'id']),
          {
            email: 'npontania@zelia.fr',
            firstname: 'Naxime',
            lastname: 'Pontania',
          });
      })
      .then(done)
      .catch(done);
  });

  it('should find a xebian by id', (done) => {
    Repository
      .addXebian('psmadja@xebia.fr')
      .then(xebian => Repository.getXebian(xebian.id))
      .then(xebian => assert.equal(xebian.email, 'psmadja@xebia.fr'))
      .then(done)
      .catch(done);
  });

  it('should find all xebians', (done) => {
    Repository
      .addXebian('xsmadja@xebia.fr')
      .then(() => Repository.getXebians())
      .then(xebians => assert.equal(xebians.length, 1))
      .then(done)
      .catch(done);
  });
});
