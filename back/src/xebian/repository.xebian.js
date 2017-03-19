const Promise = require('bluebird');
const DynamoXebian = require('./dynamo.xebian').DynamoXebian;
const _ = require('lodash');

const getXebian = xebianId =>
  Promise.promisify(DynamoXebian.get)(xebianId).then(result => result.attrs);

module.exports = {

  addXebian: (email, firstName, lastName) =>
    Promise.promisify(DynamoXebian.create)(
      {
        firstName,
        lastName,
        email,
      })
      .then(result => result.attrs),

  getXebians: () =>
    new Promise((resolve, reject) => {
      DynamoXebian.scan().limit(20).loadAll().exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(_.map(data.Items, item => item.attrs));
      });
    }),

  updateXebian: (id, firstName, lastName, email) =>
    Promise.promisify(DynamoXebian.update)(
      {
        id,
        firstName,
        lastName,
        email,
      }).then(result => result.attrs),

  updateXebianAllFields: xebian =>
    Promise.promisify(DynamoXebian.update)(xebian).then(result => result.attrs),

  getXebian,

};
