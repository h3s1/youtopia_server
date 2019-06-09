const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define(
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
        type: Sequelize.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'articles',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  article.associate = models => {
    article.belongsTo(models.User, {
      foreignKey: 'author_id',
      targetKey: 'user_id'
    });
    article.hasMany(models.ArticleLinksTag, {
      foreignKey: 'article_id',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
    article.hasMany(models.View, {
      foreignKey: 'article_id',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
    article.hasMany(models.Comment, {
      foreignKey: 'article_id',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
    article.hasMany(models.View, {
      foreignKey: 'article_id',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
  };
  return article;
};
