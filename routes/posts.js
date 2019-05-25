const express = require('express');
const router = express.Router();

const getPostList = (request, response, next) => {
  response.send('get a list of posts');
};

const createPost = (request, response, next) => {
  response.send('create a post');
};

const getPost = (request, response, next) => {
  const postId = request.params.postId;
  response.send(`get a post ${postId}`);
};

const updatePost = (request, response, next) => {
  const postId = request.params.postId;
  response.send(`update a post ${postId}`);
};

const removePost = (request, response, next) => {
  const postId = request.params.postId;
  response.send(`remove a post ${postId}`);
};

router.get('/', getPostList);
router.post('/', createPost);

router.get('/:postId/', getPost);
router.put('/:postId/', updatePost);
router.delete('/:postId/', removePost);

module.exports = router;
