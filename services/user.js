const { User } = require('../models');
const { encrypt } = require('../utils/auth');

exports.makeUser = async userInfo => {
  try {
    const { salt, encrypted } = encrypt(userInfo.password);
    await User.create({
      password: encrypted,
      salt: salt,
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

exports.findUserByEmail = email => {
  try {
    return User.findOne({
      where: { email },
      returning: true
    });
  } catch (error) {
    throw error;
  }
};
