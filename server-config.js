exports.config = {
  SERVER_CONFIG_ORIGIN: process.env.SERVER_CONFIG_METHOD,
  SERVER_CONFIG_METHOD: process.env.SERVER_CONFIG_METHOD.split(','),
  SERVER_PORT: parseInt(process.env.PORT),
  DEV_DB_HOST: process.env.DEV_DB_HOST,
  DEV_DB_USER_NAME: process.env.DEV_DB_USER_NAME,
  DEV_DB_PASSWORD: process.env.DEV_DB_PASSWORD,
  DEV_DB_PORT: parseInt(process.env.DEV_DB_PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  PASSWORD_CRYPT_ALGORITHM: process.env.PASSWORD_CRYPT_ALGORITHM
};
