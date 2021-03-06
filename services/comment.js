const { Comment, User } = require('../models');

exports.getCommentList = async (id, pageNumber) => {
  const COMMENT_PER_PAGE = 10;
  try {
    return Comment.findAll({
      attributes: {
        exclude: ['userId']
      },
      where: {
        articleId: id
      },
      include: [
        { model: User, attributes: ['id', 'nickname', 'email', 'avatarURL'] }
      ],
      order: [['createdAt', 'DESC'], ['id', 'DESC']],
      offset: pageNumber * COMMENT_PER_PAGE,
      limit: COMMENT_PER_PAGE
    });
  } catch (error) {
    throw error;
  }
};
exports.createComment = async comment => {
  try {
    await Comment.create({
      content: comment.content,
      articleId: comment.articleId,
      userId: comment.userId
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
