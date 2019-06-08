const express = require('express');
const router = express.Router();
const { makeUser } = require('../services/user');

const signUp = async (request, response, next) => {
  const userInfo = request.body;
  try {
    await makeUser(userInfo);
  } catch (error) {
    console.log(error);
    response.send('fail to sign up');
  } finally {
    response.send('Sign up');
  }
};

router.post('/', signUp);

module.exports = router;
