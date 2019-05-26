const express = require('express');
const router = express.Router();

const getRecommendationList = (request, response, next) => {
  response.send('get a list of recommendations');
};

router.get('/', getRecommendationList);

module.exports = router;
