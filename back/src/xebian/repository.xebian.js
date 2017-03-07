const Promise = require('bluebird');
const DynamoXebian = require('./dynamo.xebian').DynamoXebian;
const _ = require('lodash');
const uuid = require('uuid/v4');

const getXebian = xebianId =>
  Promise.promisify(DynamoXebian.get)(xebianId).then(result => result.attrs);
const updateXebian = xebian =>
  Promise.promisify(DynamoXebian.update)(xebian).then(result => result.attrs);

module.exports = {

  addXebian: (email, firstName, lastName) =>
    Promise.promisify(DynamoXebian.create)(
      {
        firstName,
        lastName,
        email,
      })
      .then(result => result.attrs),

  addImpact: (xebianId, customerId, description) => {
    let impact;
    return getXebian(xebianId)
      .then((xebian) => {
        const xebianWithImpact = _.assign({ impacts: [] }, xebian);
        impact = {
          id: uuid(),
          description,
        };
        xebianWithImpact.impacts.push(impact);
        return xebianWithImpact;
      })
      .then(updateXebian)
      .then(() => impact);
  },

  addFeedback: (xebianId, impactId, comment) => {
    let feedback;
    return getXebian(xebianId)
      .then((xebian) => {
        const impact = _(xebian.impacts).filter(_impact => _impact.id === impactId).first();
        impact.feedbacks = impact.feedbacks || [];
        feedback = {
          id: uuid(),
          comment,
        };
        impact.feedbacks.push(feedback);
        return xebian;
      })
      .then(updateXebian)
      .then(() => feedback);
  },

  getXebians: () =>
    new Promise((resolve, reject) => {
      DynamoXebian.scan().limit(20).loadAll().exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(_.map(data.Items, item => item.attrs));
      });
    }),

};
