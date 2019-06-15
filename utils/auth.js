const jwt = require('jsonwebtoken');

const { config } = require('../server-config');

exports.verify = token => {
  const secret = config.JWT_SECRET;
  return jwt.verify(token, Buffer.from(secret, 'base64'), {
    algorithms: [config.JWT_ALGORITHM]
  });
};
