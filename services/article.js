const Op = require('sequelize').Op;
const { Article } = require('../models');

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
