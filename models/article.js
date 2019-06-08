const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Article',
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING(2048),
        allowNull: true
      },
      // eslint-disable-next-line
      video_id: {
        type: Sequelize.STRING(2048),
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT('long')
      },
      // eslint-disable-next-line
      author_id: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: 'articles',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
};
