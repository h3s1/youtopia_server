const {
  Article,
  ArticleLinksTag,
  Comment,
  Like,
  Tag,
  User,
  sequelize
} = require('../models');

exports.getArticleList = async (category, pageNumber) => {
  const CONTENTS_PER_PAGE = 10;
  const OFFSET = pageNumber * CONTENTS_PER_PAGE;

  const QUERY = orderBy => `SELECT join2.*, user.id, user.nickname, user.email, user.avatarURL
                            FROM (SELECT join1. *,
                            COUNT( comment.articleId ) AS commentCount 
                            FROM ( SELECT article.id,
                            article.title,
                            article.videoId,
                            article.userId,
                            article.createdAt,
                            article.updatedAt,
                            article.viewCount,
                            COUNT( likes.articleId ) AS likeCount 
                            FROM article 
                            INNER JOIN likes ON article.id = likes.articleId GROUP BY article.id ) AS join1 
                            INNER JOIN comment ON join1.id = comment.articleId GROUP BY join1.id 
                            ORDER BY ${orderBy} DESC LIMIT ${CONTENTS_PER_PAGE} OFFSET ${OFFSET}) AS join2
                            INNER JOIN user ON join2.userId = user.id`;
  if (category === 'new') {
    const result = await sequelize.query(QUERY('createdAt'), {
      include: [
        { model: User, attributes: ['id', 'nickname', 'email', 'avatarURL'] }
      ]
    });
    return result[0];
  } else if (category === 'hot') {
    const result = await sequelize.query(QUERY('likeCount'));
    return result[0];
  } else {
    throw new Error('Unexpected category name.');
  }
};

exports.getArticle = async articleId => {
  await Article.update(
    { viewCount: sequelize.literal('viewCount + 1') },
    { where: { id: articleId } }
  );
  const article = await Article.findOne({
    attributes: {
      exclude: ['userId']
    },
    where: {
      id: articleId
    },
    include: {
      model: User,
      attributes: ['id', 'nickname', 'email', 'avatarURL']
    }
  });
  const likeCnt = await Like.count({
    where: {
      articleId: articleId
    }
  });
  const query = async id => {
    return await Tag.findAll({
      attributes: {
        exclude: ['articleLinksTags']
      },
      include: [
        {
          model: ArticleLinksTag,
          attributes: [],
          where: {
            articleId: id
          }
        }
      ]
    });
  };
  const tags = await query(articleId);

  return {
    ...article.dataValues,
    likeCount: likeCnt,
    tags: tags
  };
};

exports.createArticle = async article => {
  const createdArticle = await Article.create({
    title: article.title,
    content: article.content,
    videoId: article.videoId,
    userId: article.userId
  });
  for (let tag of article.tags) {
    const createdTag = await Tag.findOrCreate({
      where: {
        content: tag
      }
    });
    await ArticleLinksTag.findOrCreate({
      where: {
        articleId: createdArticle.id,
        tagId: createdTag[0].id
      }
    });
  }
};
exports.updateArticle = async article => {
  const updatedArticle = await Article.update(
    {
      title: article.title,
      content: article.content,
      videoId: article.videoId,
      userId: article.userId
    },
    { where: { id: article.id }, returning: true }
  );
  await ArticleLinksTag.destroy({
    where: {
      articleId: article.id
    }
  });
  for (let tag of article.tags) {
    const createdTag = await Tag.findOrCreate({
      where: {
        content: tag
      }
    });
    await ArticleLinksTag.findOrCreate({
      where: {
        articleId: article.id,
        tagId: createdTag[0].id
      }
    });
  }
};

exports.deleteArticle = async articleId => {
  Article.destroy({ where: { id: articleId } });
};
