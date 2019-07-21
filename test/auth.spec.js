const auth = require('../utils/auth');
const should = require('should');

describe('utils/auth.js test', () => {
  it('encryption method should return salt and encrypted', () => {
    const encryptedPassword = auth.encrypt('password');
    encryptedPassword.should.have.property('salt').which.is.a.String();
    encryptedPassword.should.have.property('encrypted').which.is.a.String();
  });

  it('verifying password', () => {
    const toBeEncrypted = 'password';
    const encryptedPassword = auth.encrypt(toBeEncrypted);

    auth.verifyPassword({
      password: toBeEncrypted,
      salt: encryptedPassword.salt,
      encrypted: encryptedPassword.encrypted
    });
  });
});
