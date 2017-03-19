const Promise = require('bluebird');
const DynamoXebian = require('../xebian/dynamo.xebian').DynamoXebian;
const _ = require('lodash');
const uuid = require('uuid/v4');
const XebianRepository = require('../xebian/repository.xebian');
const ImpactRepository = require('../impact/repository.impact');
const moment = require('moment');

module.exports = {

  addFeedback: (xebianId, impactId, createdAt) => {
    let feedback;
    return XebianRepository.getXebian(xebianId)
      .then((xebian) => {
        const impact = _(xebian.impacts).filter(_impact => _impact.id === impactId).first();
        impact.feedbacks = impact.feedbacks || [];
        feedback = {
          id: uuid(),
          createdAt: createdAt || moment().valueOf(),
          xebianId,
          customerId: impact.customerId,
          impactId,
        };
        impact.feedbacks.push(feedback);
        return xebian;
      })
      .then(XebianRepository.updateXebianAllFields)
      .then(() => feedback);
  },
  getFeedback: (xebianId, impactId, customerId, feedbackId) =>
    ImpactRepository.getImpact(xebianId, customerId, impactId)
      .then(impact => _(impact.feedbacks).find(f => f.id === feedbackId)),

  updateFeedback: (feedbackId, customerId, xebianId, impactId, comment) =>
    XebianRepository.getXebian(xebianId)
      .then((xebian) => {
        const feedbacks = _(xebian.impacts).find(i => i.id === impactId).feedbacks;
        const feedback = _(feedbacks).find(f => f.id === feedbackId);
        feedback.comment = comment;
        feedback.updatedAt = moment().valueOf();
        return Promise.promisify(DynamoXebian.update)(
          {
            id: xebianId,
            impacts: xebian.impacts,
          })
          .then(() => feedback);
      }),

};
