const { Article } = require('../models');

exports.getarticleList = async (category, lastarticleId) => {};

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
