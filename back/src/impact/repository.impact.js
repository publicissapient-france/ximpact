const db = require('../../config/db');


module.exports = {

  addImpact: (xebian_id, customer_id, description) => db('impact').returning('*').insert({
    xebian_id,
    customer_id,
    description,
  })
    .then(result => result[0]),

  getImpactsToFeedback: () =>
    db.select('*')
      .from('impact')
      .whereRaw(`id NOT IN (SELECT DISTINCT impact_id
  FROM feedback
  WHERE (comment IS NOT NULL AND feedback.customer_id IS NOT NULL) OR feedback.created_at > current_date-30)`),

  getImpactsByXebian: xebian_id => db.select('*').from('impact').where({ xebian_id }),

  getImpact: id => db.select().from('impact').where({ id }).then(result => result[0]),

};
