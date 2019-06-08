const { Article, User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userList = [...Array(10).keys()].map(num => {
      return {
        // eslint-disable-next-line
        user_id: `test${num}`,
        password: '1234',
        email: `test${num}@example.com`,
        nickname: `닉네임${num}`,
        // eslint-disable-next-line
        avatar_url:
          'https://yt3.ggpht.com/-DcTENExoDVk/AAAAAAAAAAI/AAAAAAAAAAA/cqeH0FOyCd0/s200-mo-c-c0xffffffff-rj-k-no/photo.jpg'
      };
    });
    const users = await queryInterface.bulkInsert('users', userList, {
      returning: true
    });

    const videoIds = [
      'h7qYudoK7ZM',
      'kxqn8FAVbpU',
      '42Gtm4-Ax2U',
      'ewjucLierFc',
      'ZsBAkSxwU5c',
      'ozXTSl3EnYo',
      'Q2_Z2ZYNWJw',
      'Oextk-If8HQ',
      'erG5rgNYSdk',
      'DyDfgMOUjCI',
      'VNQpP6C1fJg',
      'sy3xliyn7CQ',
      'Mfj-Xn9HolU'
    ];
    const articleList = [...Array(100).keys()].map(num => {
      return {
        // eslint-disable-next-line
        author_id: `test${num % 7}`,
        title: `${num}번 게시물 제목입니다👍`,
        content:
          '내가 그냥 두고두고 보려고 만든 영상입니다😊\n개행문자 테스트 입니다\n\n개행문자 두개를 넣었습니다\n이모지도 넣어봅니다👀📖❓🍒✏',
        // eslint-disable-next-line
        video_id: videoIds[num % videoIds.length]
      };
    });
    return queryInterface.bulkInsert('articles', articleList, {
      returning: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkDelete('users', null, {});
    return await queryInterface.bulkDelete('articles', null, {});
  }
};
