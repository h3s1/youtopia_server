const express = require('express');
const router = express.Router();
const { verifyPassword, makeJwt } = require('../utils/auth');
const { makeUser, findUserById, findUserByEmail } = require('../services/user');

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

const signIn = async (request, response, next) => {
  const loginInfo = request.body;
  try {
    const userInfo = await findUserByEmail(loginInfo.email);
    const { salt, password } = userInfo.get({ plain: true });
    console.log(
      `salt: ${salt}, encrypted : ${password}, loginPassword: ${
        loginInfo.password
      }`
    );
    const matches = verifyPassword({
      password: loginInfo.password,
      salt: Buffer.from(salt, 'base64'),
      encrypted: password
    });
    console.log(matches);
    if (matches) {
      const jwt = await makeJwt(userInfo.id);
      response.json(jwt);
    } else {
      response.send('failed to sign in');
    }
  } catch (error) {
    console.log(error);
  }
};

router.post('/', signUp);
router.post('/signin', signIn);

module.exports = router;
