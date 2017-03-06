const Joi = require('joi');
const vogels = require('../../config/vogels');

const ImpactSchema = {
  id: 'id',
  customer: 'customer',
  xebian: 'xebian',
  description: 'description',
  xebianId: 'xebianId',
  customerId: 'customerId',
};

const DynamoImpact = vogels.define('Impact', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: vogels.types.uuid(),
    xebianId: Joi.string(),
    customerId: Joi.string(),
    description: Joi.string(),
  },
  tableName: 'Impacts',
});

module.exports = {
  DynamoImpact,
  ImpactSchema,
};
