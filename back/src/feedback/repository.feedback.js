const db = require('../../config/db');


const reference_badges = [
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

  getFeedback: id => db.select().from('feedback').where({ id })
    .then(result => result[0]),

  createToken: (feedback) => {
    let created_at = feedback.created_at;
    if (feedback.created_at instanceof Date) {
      created_at = feedback.created_at.toISOString();
    }
    return `${feedback.id}_${created_at.substring(0, 19)}`;
  },

  getFeedbackByToken: token =>
    db.select()
      .from('feedback')
      .whereRaw(`id= ${token.split('_')[0]} AND created_at > '${token.split('_')[1]}'`)
      .then(result => result[0]),

  updateFeedback: (id, comment, badges, customer_id, xebian_id) =>
    db('feedback')
      .returning('*')
      .where('id', '=', id)
      .update({ customer_id, xebian_id, badges, comment })
      .then(result => result[0]),

  addFeedback: (impact_id, comment, customer_id, xebian_id, created_at, updated_at) =>
    db('feedback')
      .returning('*')
      .insert({
        impact_id,
        comment,
        xebian_id,
        customer_id,
        badges: JSON.stringify(reference_badges),
        created_at,
        updated_at,
      })
      .then(result => result[0]),

  createCustomerFeedback: (impact_id, customer_id) =>
    db('feedback')
      .returning('*')
      .insert({
        impact_id,
        customer_id,
        badges: JSON.stringify(reference_badges),
      })
      .then(result => result[0]),

  getFeedbacksByImpact: impact_id => db.select('*').from('feedback').where({ impact_id }),

};
