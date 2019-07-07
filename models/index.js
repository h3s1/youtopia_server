'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

class Article extends Sequelize.Model {}
class ArticleLinksTag extends Sequelize.Model {}
class Comment extends Sequelize.Model {}
class Like extends Sequelize.Model {}
class Tag extends Sequelize.Model {}
class User extends Sequelize.Model {}

Article.init(
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
    videoId: {
      type: Sequelize.STRING(2048),
      allowNull: true
    },
    content: {
      type: Sequelize.TEXT('long')
    },
    viewCount: {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'article',
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  }
);
ArticleLinksTag.init(
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    modelName: 'articleLinksTag',
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    indexes: [
      {
        unique: true,
        fields: ['articleId', 'tagId']
      }
    ]
  }
);
Comment.init(
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.TEXT('long')
    }
  },
  {
    sequelize,
    modelName: 'comment',
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  }
);
Like.init(
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    modelName: 'like',
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    indexes: [
      {
        unique: true,
        fields: ['articleId', 'userId']
      }
    ]
  }
);
Tag.init(
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING(500),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'tag',
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    indexes: [
      {
        unique: true,
        fields: ['content']
      }
    ]
  }
);

User.init(
  {
    id: {
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
    avatarURL: {
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
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  }
);
Article.belongsTo(User);
User.hasMany(Article);

Article.hasMany(ArticleLinksTag);
ArticleLinksTag.belongsTo(Article);
Tag.hasMany(ArticleLinksTag);
ArticleLinksTag.belongsTo(Tag);

Article.hasMany(Comment);
User.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Article);

Article.hasMany(Like);
User.hasMany(Like);
Like.belongsTo(Article);
Like.belongsTo(User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Article = Article;
db.ArticleLinksTag = ArticleLinksTag;
db.Comment = Comment;
db.Like = Like;
db.Tag = Tag;
db.User = User;
// db.User = require('./user').User;
// db.User = require('./user')(sequelize, Sequelize);
// db.Article = require('./article')(sequelize, Sequelize);
// db.ArticleLinksTag = require('./articleLinksTag')(sequelize, Sequelize);
// db.Tag = require('./tag')(sequelize, Sequelize);
// db.Comment = require('./comment')(sequelize, Sequelize);
// db.Like = require('./like')(sequelize, Sequelize);

module.exports = db;
