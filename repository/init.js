const Sequelize = require('sequelize');
const { config } = require('../server-config');

/* eslint-disable */

const sequelize = new Sequelize(
  'youtopia',
  config.DEV_DB_USER_NAME,
  config.DEV_DB_PASSWORD,
  {
    host: config.DEV_DB_HOST,
    dialect: 'mysql'
  }
);

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar_url: {
      type: Sequelize.STRING(2048),
      allowNull: true
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    }
  },
  {
    tableName: 'user',
    freezeTableName: true
  }
);

User.sequelize.sync();

/* eslint-enabled */

module.exports = { User };
