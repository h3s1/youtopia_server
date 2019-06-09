const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
    'Like',
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
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: 'like',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  like.associate = models => {
    like.belongsTo(models.Article, {
      foreignKey: 'article_id',
      targetKey: 'id'
    });
    like.belongsTo(models.User, {
      foreignKey: 'author_id',
      targetKey: 'user_id'
    });
  };
  return like;
};
