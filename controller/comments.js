const express = require('express');
const router = express.Router();
const CommentService = require('../services/comment');
const UserService = require('../services/user');
const auth = require('../utils/auth');

const getCommentList = (request, response, next) => {
  response.send('get a list of comments');
};

const createComment = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  const body = request.body;

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);

      const user = await UserService.findUserById(decoded.userId);
      await CommentService.createComment({
        content: body.content,
        articleId: request.articleId,
        userId: user.user_id
      });
      response.send('comment Uploaded');
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

const updateComment = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  const body = request.body;
  const commentId = parseInt(request.params.commentId);

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      await UserService.findUserById(decoded.userId);

      if (request.body.user_id !== decoded.userId) {
        throw new Error('User id does not match');
      }

      await CommentService.updateComment({
        content: body.content,
        id: commentId
      });
      response.send('comment updated!');
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

const removeComment = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  const body = request.body;
  const commentId = parseInt(request.params.commentId);

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      await UserService.findUserById(decoded.userId);
      if (request.body.user_id !== decoded.userId) {
        throw new Error('User id does not match');
      }

      await CommentService.removeComment(commentId);
      response.send('comment deleted!');
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

router.get('/', getCommentList);
router.post('/', createComment);

router.put('/:commentId/', updateComment);
router.delete('/:commentId/', removeComment);

module.exports = router;
