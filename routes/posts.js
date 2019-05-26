const express = require('express');
const router = express.Router();
const model = require('../models/post');
const errors = require('../utils/errors');

const getPostList = (request, response, next) => {
  const category = request.query['category'];
  const lastPostId = parseInt(request.query['last-post-id']) || undefined;
  try {
    const postList = model.getPostList(category, lastPostId);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(postList));
  } catch (error) {
    if (error.message === errors.INDEX_EXCEED_RANGE) {
      response.setHeader('Content-Type', 'text/html');
      response.statusCode = 404;
      response.send('Index exceeded range.');
    } else if (error.message === errors.CATEGORY_DO_NOT_EXIST) {
      response.setHeader('Content-Type', 'text/html');
      response.statusCode = 404;
      response.send(`We don't support category ${category}`);
    } else {
      response.send(error);
    }
  }
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
