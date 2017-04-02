const Promise = require('bluebird');
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');

const transporterSES = nodemailer.createTransport(sesTransport({
  accessKeyId: process.env.AWS_accessKeyId_XebiaFrance,
  secretAccessKey: process.env.AWS_secretAccessKey_XebiaFrance,
}));
const Mail = require('./mail');

let sendMail;
if (!process.env.DEV && process.env.SEND_FEEDBACK) {
  sendMail = Promise.promisify(transporterSES.sendMail).bind(transporterSES);
} else {
  sendMail = console.log;
}

const send = message =>
  Mail
    .build(message.template, message)
    .then(result => sendMail({
      from: '"Xebia" <impact@xebia.fr>',
      to: message.to,
      subject: result.subject,
      text: result.text,
      html: result.html,
    }));

module.exports = {
  send,
};
