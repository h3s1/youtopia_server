const express = require('express');
const router = express.Router();
const { makeUser } = require('../repository/user-repository');

const signUp = (request, response, next) => {
  const userInfo = request.body;

  makeUser(userInfo);
  response.send('Sign up');
};

router.post('/', signUp);

module.exports = router;
