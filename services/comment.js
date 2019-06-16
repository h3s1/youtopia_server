const { Comment } = require('../models');

exports.createComment = async comment => {
  try {
    await Comment.create({
      content: comment.content,
      // eslint-disable-next-line
      article_id: comment.articleId,
      // eslint-disable-next-line
      author_id: comment.userId
    });
  } catch (error) {
    throw error;
  }
};

exports.updateComment = async comment => {
  try {
    await Comment.update(
      {
        content: comment.content
      },
      { where: { id: comment.id }, returning: true }
    );
  } catch (error) {
    throw error;
  }
};

exports.removeComment = async id => {
  try {
    await Comment.destroy({ where: { id: id }, returning: true });
  } catch (error) {
    throw error;
  }
};
