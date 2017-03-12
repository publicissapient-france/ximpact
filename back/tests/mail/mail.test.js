const assert = require('assert');
const Mail = require('../../src/mail/mail');

describe('Mail', () => {
  it('should build email', (done) => {
    Mail
      .build('test-email', { name: 'Julien' })
      .then((result) => {
        assert.equal(result.html, '<h1>Bienvenue Julien !</h1>');
        assert.equal(result.text, 'Text :: Julien');
        assert.equal(result.subject, 'Subject :: Julien');
      })
      .then(done)
      .catch(done);
  });

  it('should not build email if template does not exist', (done) => {
    Mail
      .build('inexistant', { name: 'Julien' })
      .then(() => {
        done('Should fail');
      })
      .catch((err) => {
        assert.equal(err, 'No template named \'inexistant\'');
        done();
      });
  });
});
