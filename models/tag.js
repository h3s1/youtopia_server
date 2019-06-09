const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'Tag',
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING(2083),
        allowNull: false
      }
    },
    {
      tableName: 'tags',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  tag.associate = models => {
    tag.hasMany(models.ArticleLinksTag, {
      foreignKey: 'tag_id',
      sourceKey: 'id'
    });
  };
  return tag;
};
