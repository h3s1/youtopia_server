const express = require('express');
const router = express.Router();
const ArticleService = require('../services/article');

const getRecommendationList = async (request, response, next) => {
  try {
    const articleList = await ArticleService.getarticleList('hot', 0);
    response.json(articleList);
  } catch (error) {
    response.send(error);
  }
};

router.get('/', getRecommendationList);

module.exports = router;
