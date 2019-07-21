const auth = require('../utils/auth');
const should = require('should');

describe('utils/auth.js test', () => {
  describe('password functions test', () => {
    it('encryption method should return salt and encrypted', () => {
      const encryptedPassword = auth.encrypt('password');
      encryptedPassword.should.have.property('salt').which.is.a.String();
      encryptedPassword.should.have.property('encrypted').which.is.a.String();
    });

    it('verifying password', () => {
      const toBeEncrypted = 'password';
      const encryptedPassword = auth.encrypt(toBeEncrypted);

      auth
        .verifyPassword({
          password: toBeEncrypted,
          salt: encryptedPassword.salt,
          encrypted: encryptedPassword.encrypted
        })
        .should.equals(true);
    });
  });

  describe('jwt functions test', () => {
    const userId = 'youtopia';

    it('make jwt', done => {
      auth.makeJwt(userId).then(token => {
        token.should.be.a.String();
        done();
      });
    });

    it('verify jwt', done => {
      auth.makeJwt(userId).then(token => {
        try {
          const decoded = auth.verify(token);
          decoded.should.have
            .property('userId')
            .which.is.a.String()
            .and.which.equals(userId);
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });
});
