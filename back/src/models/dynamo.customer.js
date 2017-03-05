const Joi = require('joi');
const vogels = require('../../config/vogels');

const CustomerSchema = {
  id: 'id',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  company: 'company',
};

const DynamoCustomer = vogels.define('Customer', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: Joi.string(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    company: Joi.string(),
  },
  tableName: 'Customers'
});

module.exports = {
  DynamoCustomer,
  CustomerSchema
};
