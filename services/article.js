const { Op, fn, col } = require('sequelize');
const { Article, Like, View } = require('../models');

exports.getarticleList = async (category, lastarticleId) => {
  if (category === 'new') {
    try {
      const nextArticle = await Article.findOne({
        where: {
          // eslint-disable-next-line
          id: {
            [Op.gt]: lastarticleId || 0
          }
        }
      });
      console.log(nextArticle.id);
      return await Article.findAll({
        where: {
          id: {
            [Op.gte]: nextArticle.id
          }
        },
        limit: 6
      });
    } catch (error) {
      throw error;
    }
  } else if (category === 'hot') {
  } else {
    throw new Error('Unexpected category name.');
  }
};

exports.createArticle = async article => {
  Article.create({
    title: article.title,
    content: article.content,
    // eslint-disable-next-line
    video_id: article.videoId,
    // eslint-disable-next-line
    author_id: article.userId
  });
};

exports.getArticle = async (articleId, userId) => {
  const article = await Article.findOne({
    where: {
      id: articleId
    }
  });
  const likeCnt = await Like.count({
    where: {
      // eslint-disable-next-line
      article_id: articleId
    }
  });
  await View.create({
    // eslint-disable-next-line
    author_id: userId,
    // eslint-disable-next-line
    article_id: userId
  });
  const viewCnt = await View.count({
    where: {
      // eslint-disable-next-line
      article_id: articleId
    }
  });

  return { ...article.dataValues, likes: likeCnt, views: viewCnt };
};

exports.updateArticle = async article => {
  Article.update(
    {
      title: article.title,
      content: article.content,
      // eslint-disable-next-line
      video_id: article.video_id,
      // eslint-disable-next-line
      author_id: article.userId
    },
    { where: { id: article.id } }
  );
};

exports.deleteArticle = async articleId => {
  Article.destroy({ where: { id: articleId } });
};
