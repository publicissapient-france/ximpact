const ImpactRepository = require('../impact/repository.impact');
const FeedbackRepository = require('../feedback/repository.feedback');

module.exports = {
  sendFeedbackRequest: () => {
    console.log('It\'s time to feedback');
    ImpactRepository
      .getImpactsToFeedback()
      .then(impacts =>
        impacts.forEach(impact => FeedbackRepository.addFeedback(impact.xebianId, impact.id)));
  },
};
