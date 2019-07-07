module.exports = {
  development: {
    username: process.env.DEVELOPETMENT_USERNAME,
    password: process.env.DEVELOPETMENT_PASSWORD,
    database: process.env.DEVELOPETMENT_DATABASE,
    host: process.env.DEVELOPETMENT_HOST,
    port: process.env.DEVELOPETMENT_PORT,
    dialect: process.env.DEVELOPETMENT_DIALECT,
    define: {
      charset: utf8mb4,
      // eslint-disable-next-line
      collate: utf8mb4_general_ci,
      timestamps: true
    },
    // eslint-disable-next-line
    jwt_secret: process.env.DEVELOPETMENT_JWT_SECRET
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    port: process.env.TEST_PORT,
    dialect: process.env.TEST_DIALECT,
    define: {
      charset: utf8mb4,
      // eslint-disable-next-line
      collate: utf8mb4_general_ci,
      timestamps: true
    },
    // eslint-disable-next-line
    jwt_secret: process.env.TEST_JWT_SECRET
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    port: process.env.PRODUCTION_PORT,
    dialect: process.env.PRODUCTION_DIALECT,
    define: {
      charset: utf8mb4,
      // eslint-disable-next-line
      collate: utf8mb4_general_ci,
      timestamps: true
    },
    // eslint-disable-next-line
    jwt_secret: process.env.PRODUCTION_JWT_SECRET
  }
};