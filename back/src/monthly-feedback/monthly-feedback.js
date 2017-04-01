const ImpactRepository = require('../impact/repository.impact');

module.exports = {
  sendFeedbackRequest: () => {
    console.log('It\'s time to feedback');
    ImpactRepository
      .getImpactsToFeedback()
      .then(impacts =>
        impacts.forEach(console.log));
  },
};
