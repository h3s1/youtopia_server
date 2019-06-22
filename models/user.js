const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      // eslint-disable-next-line
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // eslint-disable-next-line
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
      tableName: 'users',
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  );
  user.associate = models => {
    user.hasMany(models.Article, {
      foreignKey: 'author_id',
      sourceKey: 'user_id',
      onDelete: 'cascade'
    });
    user.hasMany(models.Comment, {
      foreignKey: 'author_id',
      sourceKey: 'user_id',
      onDelete: 'cascade'
    });
    user.hasMany(models.Like, {
      foreignKey: 'author_id',
      sourceKey: 'user_id',
      onDelete: 'cascade'
    });
  };
  return user;
};
