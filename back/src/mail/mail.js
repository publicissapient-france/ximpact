const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const Promise = require('bluebird');
const Handlebars = require('handlebars');
const requireText = require('require-text');

const preheaderTranslations = {
  fr: 'X-Impact, nous croyons en la culture du feedback',
};

const headerTemplate = Handlebars.compile(requireText('./templates/header.html', require));

Handlebars.registerPartial('header', () => headerTemplate({ preheader: preheaderTranslations.fr }));
Handlebars.registerPartial('footer', requireText('./templates/footer.html', require));

const templateNames = ['invitation-email', 'test-email'];

const templates = {};

templateNames.forEach((templateName) => {
  const emailTemplate = new EmailTemplate(path.join(__dirname, './templates', templateName));
  templates[templateName] = Promise.promisify(emailTemplate.render).bind(emailTemplate);
});

const build = (templateName, data) => {
  const template = templates[templateName];
  if (template) {
    return template(data, data.language);
  }
  return Promise.reject(`No template named '${templateName}'`);
};
module.exports = {
  build,
};
