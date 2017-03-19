const Promise = require('bluebird');
const DynamoXebian = require('../xebian/dynamo.xebian').DynamoXebian;
const _ = require('lodash');
const uuid = require('uuid/v4');
const moment = require('moment');
const XebianRepository = require('../xebian/repository.xebian');

const getImpact = (xebianId, customerId, impactId) =>
  XebianRepository.getXebian(xebianId)
    .then(xebian => _(xebian.impacts).find(i => i.id === impactId && i.customerId === customerId));

const isFeedbackToOld = (feedback) => {
  const lastFeedbackCreationDate = moment(feedback.createdAt);
  const normalNextCreationDate = lastFeedbackCreationDate.add(1, 'months');
  return normalNextCreationDate.isSameOrBefore(moment());
};

const shouldCreateNewFeedback = (impact) => {
  if (impact.feedbacks) {
    const lastFeedback = _(impact.feedbacks).orderBy('createdAt', 'desc').first();
    return lastFeedback.comment ? isFeedbackToOld(lastFeedback) : false;
  }
  // need to create the first impact's feedback
  return true;
};

module.exports = {

  addImpact: (xebianId, customerId, description) => {
    let impact;
    return XebianRepository.getXebian(xebianId)
      .then((xebian) => {
        const xebianWithImpact = _.assign({ impacts: [] }, xebian);
        impact = {
          id: uuid(),
          createdAt: moment().valueOf(),
          description,
          xebianId,
          customerId,
        };
        xebianWithImpact.impacts.push(impact);
        return xebianWithImpact;
      })
      .then(XebianRepository.updateXebianAllFields)
      .then(() => impact);
  },

  getImpactsToFeedback: () =>
    new Promise((resolve, reject) => {
      DynamoXebian
        .scan()
        .where('impacts').notNull()
        .limit(200)
        .loadAll()
        .exec((err, data) => {
          if (err) {
            return reject(err);
          }
          const impacts = _(data.Items)
            .map(item => item.attrs.impacts)
            .flatten()
            .filter(shouldCreateNewFeedback)
            .value();
          return resolve(impacts);
        });
    }),

  getImpact,

};
