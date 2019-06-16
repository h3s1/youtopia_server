const { User } = require('../models');

exports.makeUser = async userInfo => {
  try {
    await User.create({
      // eslint-disable-next-line
      user_id: userInfo.user_id,
      password: userInfo.password,
      // eslint-disable-next-line
      avatar_url: userInfo.avatar_url,
      nickname: userInfo.nickname,
      email: userInfo.email
    });
  } catch (error) {
    throw error;
  }
};

exports.findUserById = userId => {
  try {
    return User.findOne({
      // eslint-disable-next-line
      where: { user_id: userId },
      returning: true
    });
  } catch (error) {
    throw error;
  }
};
