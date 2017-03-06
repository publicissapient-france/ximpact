const vogels = require('vogels');

vogels.AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: process.env.AWS_accessKeyId_XebiaFrance,
  secretAccessKey: process.env.AWS_secretAccessKey_XebiaFrance,
  endpoint: process.env.DEV ? 'http://localhost:8000' : undefined,
});

module.exports = vogels;
