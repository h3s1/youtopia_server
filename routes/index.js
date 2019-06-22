const express = require('express');
const router = express.Router();
const articleRouter = require('../controller/articles');
const commentRouter = require('../controller/comments');
const recommendationRouter = require('../controller/recommendations');
const likeRouter = require('../controller/likes');
const userRouter = require('../controller/users');

router.get('/', (req, res, next) => {
  res.status(200);
  res.end('Welcome to Youtopia!');
});

router.use('/articles/', articleRouter);
router.use('/articles/:articleId/', (request, response, next) => {
  request.articleId = parseInt(request.params.articleId);
  next();
});
router.use('/articles/:articleId/comments/', commentRouter);
router.use('/articles/:articleId/likes/', likeRouter);
router.use('/recommendations/', recommendationRouter);
router.use('/users/', userRouter);

module.exports = router;
