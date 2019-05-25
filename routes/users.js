const express = require('express');
const router = express.Router();

const signIn = (request, response, next) => {
  response.send('Sign in');
};

router.post('/', signIn);

module.exports = router;
