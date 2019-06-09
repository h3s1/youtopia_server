const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const articleLinksTag = sequelize.define(
    'ArticleLinksTag',
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
      tag_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: 'article_links_tag',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  articleLinksTag.associate = models => {
    articleLinksTag.belongsTo(models.Article, {
      foreignKey: 'article_id',
      targetKey: 'id'
    });
  };
  articleLinksTag.associate = models => {
    articleLinksTag.belongsTo(models.Tag, {
      foreignKey: 'tag_id',
      targetKey: 'id'
    });
  };
  return articleLinksTag;
};
