const { User } = require('../models');
const { encrypt } = require('../utils/auth');

exports.makeUser = async userInfo => {
  try {
    const { salt, encrypted } = encrypt(userInfo.password);
    await User.create({
      password: encrypted,
      salt: salt,
      avatarURL: userInfo.avatarURL,
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
      where: { id: userId },
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
