const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { config } = require('../server-config');

exports.verify = token => {
  const secret = config.JWT_SECRET;
  return jwt.verify(token, Buffer.from(secret, 'base64'), {
    algorithms: [config.JWT_ALGORITHM]
  });
};

exports.encrypt = password => {
  const buf = crypto.randomBytes(64);
  const key = crypto.pbkdf2Sync(
    password,
    buf.toString('base64'),
    100000,
    64,
    config.PASSWORD_CRYPT_ALGORITHM
  );
  return { salt: buf.toString('base64'), encrypted: key.toString('base64') };
};

exports.verifyPassword = ({ password, salt, encrypted }) => {
  const generated = crypto.pbkdf2Sync(
    password,
    salt.toString('base64'),
    100000,
    64,
    config.PASSWORD_CRYPT_ALGORITHM
  );
  return generated.toString('base64') === encrypted;
};

exports.makeJwt = async userId => {
  const newToken = await jwt.sign({ userId: userId }, config.JWT_SECRET, {
    algorithm: config.JWT_ALGORITHM,
    issuer: 'h3s1',
    expiresIn: '1h'
  });
  return newToken;
};
