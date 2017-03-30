const Promise = require('bluebird');
const DynamoXebian = require('../xebian/dynamo.xebian').DynamoXebian;
const _ = require('lodash');
const uuid = require('uuid/v4');
const XebianRepository = require('../xebian/repository.xebian');
const ImpactRepository = require('../impact/repository.impact');
const moment = require('moment');
const Comment = require('../feedback/comment.model');

const getFeedback = (xebianId, impactId, customerId, feedbackId) =>
  ImpactRepository.getImpact(xebianId, customerId, impactId)
    .then(impact => _(impact.feedbacks).find(f => f.id === feedbackId));

const badges = [
  {
    id: 'people-first',
    label: 'People First',
    description: 'L\'individu, son bien-être, sa progression tant technologique que sociale, sont au centre des préoccupations de la société. Le Pacte Social de Xebia est un juste équilibre entre les aspirations de chacun et celles de la société.',
    value: false,
  },
  {
    id: 'quality-without-compromise',
    label: 'Quality Without Compromise',
    description: 'La qualité en vigueur chez Xebia est présente à tous les niveaux : qualité des logiciels que nous aidons à construire et des prestations que nous délivrons, qualité des relations que nous entretenons avec nos clients, qualité de notre environnement de travail, qualité de nos interactions avec notre écosystème, qualité des relations avec nos collègues.',
    value: false,
  },
  {
    id: 'customer-intimacy',
    label: 'Customer Intimacy',
    description: 'Nous avons pour obligation de partager l\'intelligence collective en interne comme à l\'extérieur de la société en exposant, sans censure et par le biais de tous les canaux possibles, nos connaissances. Nous avons un savoir-faire et nous le faisons savoir.',
    value: false,
  },
  {
    id: 'sharing-knowledge',
    label: 'sharing-knowledge',
    description: 'Nous construisons des relations professionnelles intimes avec nos clients. Loin d\'une relation client-fournisseur classique, nous avons des relations d\'égal à égal. Cela n\'est rendu possible que parce que nous occupons auprès d\'eux un rôle particulier : celui de bras droit.',
    value: false,
  },
];

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
          badges,
        };
        impact.feedbacks.push(feedback);
        return xebian;
      })
      .then(XebianRepository.updateXebianAllFields)
      .then(() => feedback);
  },
  getFeedback,

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

  addComment: (feedbackId, xebianId, impactId, text, authorEmail) =>
    XebianRepository.getXebian(xebianId)
      .then((xebian) => {
        const impact = _(xebian.impacts).find(i => i.id === impactId);
        const feedbacks = impact.feedbacks;
        const feedback = _(feedbacks).find(f => f.id === feedbackId);
        feedback.comments = feedback.comments || [];
        feedback.comments.push(new Comment(text, authorEmail));
        feedback.updatedAt = moment().valueOf();
        return Promise.promisify(DynamoXebian.update)(
          {
            id: xebianId,
            impacts: xebian.impacts,
          })
          .then(() => feedback);
      }),

};
