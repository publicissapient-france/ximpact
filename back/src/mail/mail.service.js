const Promise = require('bluebird');
const nodemailer = require('nodemailer');

const transporterSES = nodemailer.createTransport({
  transport: 'ses',
  accessKeyId: process.env.AWS_accessKeyId_XebiaFrance,
  secretAccessKey: process.env.AWS_secretAccessKey_XebiaFrance,
  region: process.env.AWS_SES_region,
});
const Mail = require('./mail');

const sendMail = Promise.promisify(transporterSES.sendMail).bind(transporterSES);

module.exports = {
  send: message =>
    Mail
      .build(message.template, message)
      .then(result => sendMail({
        from: '"Xebia" <ximpact@xebia.fr>',
        to: message.to,
        subject: result.subject,
        text: result.text,
        html: result.html,
      })),
};
