const vogels = require('vogels');

vogels.AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: '',
  secretAccessKey: '',
});

module.exports = vogels;
