const express = require('express');
const router = express.Router();

const getCommentList = (request, response, next) => {
  response.send('get a list of comments');
};

const createComment = (request, response, next) => {
  response.send('create a comment');
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
