const Joi = require('joi');
const vogels = require('../../config/vogels');

const XebianSchema = {
  id: 'id',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
};

const DynamoXebian = vogels.define('Xebian', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: Joi.string(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  },
  tableName: 'Xebians'
});

module.exports = {
  DynamoXebian,
  XebianSchema
};
