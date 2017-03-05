const vogels = require('vogels');

vogels.AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: process.env.AWS_accessKeyId_XebiaFrance,
  secretAccessKey: process.env.AWS_secretAccessKey_XebiaFrance,
});

//endpoint: 'http://localhost:8000',

module.exports = vogels;
