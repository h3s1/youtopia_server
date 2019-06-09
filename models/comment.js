const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    'Comment',
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.TEXT('long')
      },
      // eslint-disable-next-line
      article_id: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      // eslint-disable-next-line
      author_id: {
        type: Sequelize.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'comment',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  comment.associate = models => {
    comment.belongsTo(models.User, {
      foreignKey: 'author_id',
      targetKey: 'user_id'
    });
    comment.belongsTo(models.Article, {
      foreignKey: 'article_id',
      targetKey: 'id'
    });
  };
  return comment;
};
