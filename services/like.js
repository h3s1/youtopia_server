const { Like } = require('../models');

exports.createLike = async (articleId, userId) => {
  try {
    await Like.create({
      // eslint-disable-next-line
      article_id: articleId,
      // eslint-disable-next-line
      author_id: userId
    });
  } catch (error) {
    throw error;
  }
};

exports.removeLike = async (articleId, userId) => {
  try {
    return await Like.destroy({
      where: {
        // eslint-disable-next-line
        article_id: articleId,
        // eslint-disable-next-line
        author_id: userId
      },
      returning: true
    });
  } catch (error) {
    throw error;
  }
};
