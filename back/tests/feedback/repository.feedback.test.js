const assert = require('assert');
const ImpactRepository = require('../../src/impact/repository.impact');
const FeedbackRepository = require('../../src/feedback/repository.feedback');
const XebianRepository = require('../../src/xebian/repository.xebian');
const CustomerRepository = require('../../src/customer/repository.customer');
const _ = require('lodash');

describe('Feedback Repository', () => {
  it('should add a feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Faire compiler un module'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId))
      .then(feedback => assert.deepEqual(_.omit(feedback, ['id', 'createdAt']),
        {
          xebianId,
          customerId,
          impactId,
          badges: [
            {id:'people-first', label:'People First', description: `L'individu, son bien-être, sa progression tant technologique que sociale, sont au centre des préoccupations de la société. Le Pacte Social de Xebia est un juste équilibre entre les aspirations de chacun et celles de la société.`, value: false},
            {id:'quality-without-compromise', label:'Quality Without Compromise', description: `La qualité en vigueur chez Xebia est présente à tous les niveaux : qualité des logiciels que nous aidons à construire et des prestations que nous délivrons, qualité des relations que nous entretenons avec nos clients, qualité de notre environnement de travail, qualité de nos interactions avec notre écosystème, qualité des relations avec nos collègues.`, value: false},
            {id:'customer-intimacy', label:'Customer Intimacy', description: `Nous avons pour obligation de partager l'intelligence collective en interne comme à l'extérieur de la société en exposant, sans censure et par le biais de tous les canaux possibles, nos connaissances. Nous avons un savoir-faire et nous le faisons savoir.`, value: false},
            {id:'sharing-knowledge', label:'sharing-knowledge', description: `Nous construisons des relations professionnelles intimes avec nos clients. Loin d'une relation client-fournisseur classique, nous avons des relations d'égal à égal. Cela n'est rendu possible que parce que nous occupons auprès d'eux un rôle particulier : celui de bras droit.`, value: false},
          ]
        }))
      .then(done)
      .catch(done);
  });

  it('should updated a feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    let feedbackId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('jsmadja@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre proactif'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId))
      .then(feedback => feedbackId = feedback.id)
      .then(() => FeedbackRepository.updateFeedback(feedbackId, customerId, xebianId, impactId, 'Ca c est mon comment'))
      .then(() => FeedbackRepository.getFeedback(xebianId, impactId, customerId, feedbackId))
      .then(feedback => assert.equal(feedback.comment, 'Ca c est mon comment'))
      .then(done)
      .catch(done);
  });

  it('should get feedback', (done) => {
    let xebianId;
    let customerId;
    let impactId;
    let feedbackId;
    CustomerRepository
      .addCustomer('mfontania@mycompany.com')
      .then(customer => customerId = customer.id)
      .then(() => XebianRepository.addXebian('bleponge@xebia.fr'))
      .then(xebian => xebianId = xebian.id)
      .then(() => ImpactRepository.addImpact(xebianId, customerId, 'Etre ponctuel'))
      .then(impact => impactId = impact.id)
      .then(() => FeedbackRepository.addFeedback(xebianId, impactId))
      .then(feedback => feedbackId = feedback.id)
      .then(() => FeedbackRepository.getFeedback(xebianId, impactId, customerId, feedbackId))
      .then(feedback => assert.deepEqual(_.omit(feedback, ['createdAt']), {
        customerId,
        xebianId,
        id: feedbackId,
        impactId,
        badges: [
          {id:'people-first', label:'People First', description: `L'individu, son bien-être, sa progression tant technologique que sociale, sont au centre des préoccupations de la société. Le Pacte Social de Xebia est un juste équilibre entre les aspirations de chacun et celles de la société.`, value: false},
          {id:'quality-without-compromise', label:'Quality Without Compromise', description: `La qualité en vigueur chez Xebia est présente à tous les niveaux : qualité des logiciels que nous aidons à construire et des prestations que nous délivrons, qualité des relations que nous entretenons avec nos clients, qualité de notre environnement de travail, qualité de nos interactions avec notre écosystème, qualité des relations avec nos collègues.`, value: false},
          {id:'customer-intimacy', label:'Customer Intimacy', description: `Nous avons pour obligation de partager l'intelligence collective en interne comme à l'extérieur de la société en exposant, sans censure et par le biais de tous les canaux possibles, nos connaissances. Nous avons un savoir-faire et nous le faisons savoir.`, value: false},
          {id:'sharing-knowledge', label:'sharing-knowledge', description: `Nous construisons des relations professionnelles intimes avec nos clients. Loin d'une relation client-fournisseur classique, nous avons des relations d'égal à égal. Cela n'est rendu possible que parce que nous occupons auprès d'eux un rôle particulier : celui de bras droit.`, value: false},
        ]
      }))
      .then(done)
      .catch(done);
  });
});
