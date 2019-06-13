const express = require('express');
const router = express.Router();
const model = require('../services/comment');

const getCommentList = (request, response, next) => {
  response.send('get a list of comments');
};

const createComment = (request, response, next) => {
  const articleId = parseInt(request.params.articleId);
  body = request.body;
  try {
    model.createComment({
      content: body.content,
      articleId: articleId,
      userId: body.user_id
    });
    response.send('comment Uploaded');
  } catch (error) {
    response.send(error.message);
  }
};

const updateComment = (request, response, next) => {
  const commentId = request.params.commentId;
  response.send(`update a comment ${commentId}`);
};

const removeComment = (request, response, next) => {
  const commentId = request.params.commentId;
  response.send(`remove a comment ${commentId}`);
};

router.get('/', getCommentList);
router.post('/', createComment);

router.put('/:commentId/', updateComment);
router.delete('/:commentId/', removeComment);

module.exports = router;
