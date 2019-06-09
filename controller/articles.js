const express = require('express');
const router = express.Router();
const model = require('../services/article');
const errors = require('../utils/errors');

const getArticleList = async (request, response, next) => {
  const category = request.query['category'];
  const lastarticleId = parseInt(request.query['last-article-id']) || undefined;
  try {
    const articleList = await model.getarticleList(category, lastarticleId);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(articleList));
  } catch (error) {
    response.send(error);
  }
};

const createArticle = (request, response, next) => {
  body = request.body;
  try {
    model.createArticle({
      title: body.title,
      content: body.content,
      videoId: body.video_id,
      userId: body.user_id
    });
  } catch (error) {
    response.send(error);
  }
  response.send('article Uploaded');
};

const getArticle = (request, response, next) => {
  const articleId = request.params.articleId;
  response.send(`get a article ${articleId}`);
};

const updateArticle = (request, response, next) => {
  const articleId = request.params.articleId;
  response.send(`update a article ${articleId}`);
};

const removeArticle = (request, response, next) => {
  const articleId = request.params.articleId;
  response.send(`remove a article ${articleId}`);
};

router.get('/', getArticleList);
router.post('/', createArticle);

router.get('/:articleId/', getArticle);
router.put('/:articleId/', updateArticle);
router.delete('/:articleId/', removeArticle);

module.exports = router;
