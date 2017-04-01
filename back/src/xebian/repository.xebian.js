const db = require('../../config/db');

module.exports = {

  addXebian: email => db('xebian').returning('*').insert({ email })
    .then(result => result[0]),

  getXebians: () => db.select('*').from('xebian'),

  updateXebian: (id, firstname, lastname, email) =>
    db('xebian')
      .returning('*')
      .where('id', '=', id)
      .update({ firstname, lastname, email, updated_at: undefined })
      .then(result => result[0]),

  getXebian: id =>
    db
      .select()
      .from('xebian')
      .where({ id })
      .then(result => result['0']),

};
