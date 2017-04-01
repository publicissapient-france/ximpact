const db = require('../../config/db');

module.exports = {
  addCustomer: email => db('customer').returning('*').insert({ email })
    .then(result => result[0]),

  updateCustomer: (id, company, firstname, lastname, email) =>
    db('customer')
      .returning('*')
      .where('id', '=', id)
      .update({ company, firstname, lastname, email, updated_at: undefined })
      .then(result => result[0]),

  getCustomers: () => db.select('*').from('customer'),

  getCustomer: id => db.select().from('customer').where({ id }).then(result => result['0']),
};
