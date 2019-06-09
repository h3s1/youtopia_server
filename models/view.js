const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const view = sequelize.define(
    'View',
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      // eslint-disable-next-line
      article_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      // eslint-disable-next-line
      author_id: {
        type: Sequelize.STRING(2083),
        allowNull: false
      }
    },
    {
      tableName: 'view',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  view.associate = models => {
    view.belongsTo(models.Article, {
      foreignKey: 'article_id',
      targetKey: 'id'
    });
  };
  view.associate = models => {
    view.belongsTo(models.User, {
      foreignKey: 'author_id',
      targetKey: 'user_id'
    });
  };
  return view;
};
