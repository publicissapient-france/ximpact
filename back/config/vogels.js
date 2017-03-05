const vogels = require('vogels');

vogels.AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

module.exports = vogels;
