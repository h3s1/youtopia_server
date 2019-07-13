const { Like } = require('../models');

exports.createLike = async (articleID, uid) => {
  try {
    await Like.create({
      articleId: articleID,
      userId: uid
    });
  } catch (error) {
    throw error;
  }
};

exports.removeLike = async (articleID, uid) => {
  try {
    return await Like.destroy({
      where: {
        articleId: articleID,
        userId: uid
      },
      returning: true
    });
  } catch (error) {
    throw error;
  }
};
