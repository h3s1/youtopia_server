const { User } = require('./init');

/* eslint-disable */
const makeUser = async userInfo => {
  const alreadyExist = await User.count({
    where: { user_id: userInfo.user_id }
  }).then(count => {
    if (count > 0) {
      return true;
    }
    return false;
  });

  if (alreadyExist) {
    return;
  }

  User.create({
    user_id: userInfo.user_id,
    password: userInfo.password,
    avatar_url: userInfo.avatar_url,
    nickname: userInfo.nickname,
    email: userInfo.email
  });
};

/* eslint-enabled */

module.exports = { makeUser };
