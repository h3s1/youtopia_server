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
