const express = require('express');
const router = express.Router();
const LikeService = require('../services/like');
const UserService = require('../services/user');
const auth = require('../utils/auth');

const createLike = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      const user = await UserService.findUserById(decoded.userId);

      await LikeService.createLike(request.articleId, user.user_id);
      response.send('liked');
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

const removeLike = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }

  const token = request.headers.authorization.split(' ')[1];

  if (typeof token !== 'undefined') {
    try {
      const decoded = auth.verify(token);
      const user = await UserService.findUserById(decoded.userId);

      await LikeService.removeLike(request.articleId, user.user_id);
      response.send('liked canceled');
    } catch (error) {
      response.status(400).send(error.message);
    }
  } else {
    res.status(403).send(error.message);
  }
};

router.post('/', createLike);
router.delete('/', removeLike);

module.exports = router;
