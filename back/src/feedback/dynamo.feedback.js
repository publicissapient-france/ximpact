const Joi = require('joi');
const vogels = require('../../config/vogels');

const FeedbackSchema = {
  id: 'id',
  comment: 'comment',
  impactId: 'impactId',
};

const DynamoFeedback = vogels.define('Feedback', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: vogels.types.uuid(),
    comment: Joi.string(),
    impactId: Joi.string(),
  },
  tableName: 'Feedbacks',
});

module.exports = {
  DynamoFeedback,
  FeedbackSchema,
};
