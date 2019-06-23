const express = require('express');
const router = express.Router();
const model = require('../services/article');
const auth = require('../utils/auth');
const UserService = require('../services/user');
const errors = require('../utils/errors');

const getArticleList = async (request, response, next) => {
  const category = request.query['category'];
  const pageNumber = parseInt(request.query['page-number']) || 0;
  try {
    const articleList = await model.getArticleList(category, pageNumber);
    response.json(articleList);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const createArticle = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      const user = await UserService.findUserById(decoded.userId);

      body = request.body;
      await model.createArticle({
        userId: user.user_id,
        title: body.title,
        content: body.content,
        videoId: body.video_id,
        tags: body.tags
      });
      response.send('article Uploaded');
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

const getArticle = async (request, response, next) => {
  const articleId = parseInt(request.params.articleId);

  try {
    const article = await model.getArticle(articleId);
    response.json(article);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

const updateArticle = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  body = request.body;
  const articleId = parseInt(request.params.articleId);

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      await UserService.findUserById(decoded.userId);

      await model.updateArticle({
        id: articleId,
        title: body.title,
        content: body.content,
        videoId: body.video_id,
        userId: body.user_id,
        tags: body.tags
      });
      response.send(`update an article ${articleId}`);
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

const removeArticle = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  const articleId = parseInt(request.params.articleId);

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      await UserService.findUserById(decoded.userId);

      await model.deleteArticle(articleId);
      response.send(`remove an article ${articleId}`);
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

router.get('/', getArticleList);
router.post('/', createArticle);

router.get('/:articleId/', getArticle);
router.put('/:articleId/', updateArticle);
router.delete('/:articleId/', removeArticle);

module.exports = router;
