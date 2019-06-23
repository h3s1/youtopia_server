const {
  Article,
  ArticleLinksTag,
  Comment,
  Like,
  Tag,
  User
} = require('../models/index');
const { encrypt } = require('../utils/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { salt, encrypted } = encrypt('1234');
    const userList = [...Array(10).keys()].map(num => {
      return {
        // eslint-disable-next-line
        password: encrypted,
        salt: salt,
        email: `test${num}@example.com`,
        nickname: `닉네임${num}`,
        // eslint-disable-next-line
        avatar_url:
          'https://yt3.ggpht.com/-DcTENExoDVk/AAAAAAAAAAI/AAAAAAAAAAA/cqeH0FOyCd0/s200-mo-c-c0xffffffff-rj-k-no/photo.jpg',
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, '')
      };
    });
    const users = await User.bulkCreate(userList, {
      returning: true
    });
    console.log('user inserted!');

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
        author_id: users[num % 10].user_id,
        title: `${num}번 게시물 제목입니다👍`,
        content:
          '내가 그냥 두고두고 보려고 만든 영상입니다😊\n개행문자 테스트 입니다\n\n개행문자 두개를 넣었습니다\n이모지도 넣어봅니다👀📖❓🍒✏',
        // eslint-disable-next-line
        video_id: videoIds[num % videoIds.length],
        createdAt: new Date(2019, 5, 22, 17, parseInt(num / 60), num % 60)
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date(2019, 5, 22, 17, parseInt(num / 60), num % 60)
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, '')
      };
    });
    const articles = await Article.bulkCreate(articleList, {
      returning: true
    });
    console.log('articles inserted!');

    // add tags to article
    const tagNames = [
      '걸그룹',
      '보이그룹',
      '메이크업',
      '음악',
      '케이팝',
      '기술',
      '애플',
      '모니터',
      '노트북',
      '텀블러',
      '핸드백',
      '마우스'
    ];
    const tags = await Tag.bulkCreate(
      tagNames.map(name => ({
        content: name
      })),
      {
        returning: true
      }
    );
    console.log('tags inserted!');
    let linkList = [];
    for (let i = 0; i < articles.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (Math.round(Math.random())) {
          linkList.push({
            // eslint-disable-next-line
            article_id: articles[i].id,
            // eslint-disable-next-line
            tag_id: tags[j].id,
            createdAt: new Date(2019, 5, 22, 17, parseInt(i / 60), i % 60)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, ''),
            updatedAt: new Date(2019, 5, 22, 17, parseInt(i / 60), i % 60)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          });
        }
      }
    }
    await queryInterface.bulkInsert('article_links_tag', linkList, {
      returning: true
    });
    console.log('links inserted!');

    // add comments to article
    let commentList = [];
    for (let i = 0; i < articles.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (Math.round(Math.random())) {
          commentList.push({
            content: `테스트용 ${j}번 댓글입니다 👍✏🍒❓📖`,
            // eslint-disable-next-line
            article_id: articles[i].id,
            // eslint-disable-next-line
            author_id: users[j].user_id,
            createdAt: new Date(2019, 5, 22, 17, parseInt(i / 60), i % 60)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, ''),
            updatedAt: new Date(2019, 5, 22, 17, parseInt(i / 60), i % 60)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          });
        }
      }
    }
    await queryInterface.bulkInsert('comment', commentList, {
      returning: true
    });
    console.log('comments inserted!');

    // add like to article
    let likeList = [];
    for (let i = 0; i < articles.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (Math.round(Math.random())) {
          likeList.push({
            // eslint-disable-next-line
            article_id: articles[i].id,
            // eslint-disable-next-line
            author_id: users[j].user_id,
            createdAt: new Date(2019, 5, 22, 17, parseInt(i / 60), i % 60)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, ''),
            updatedAt: new Date(2019, 5, 22, 17, parseInt(i / 60), i % 60)
              .toISOString()
              .replace(/T/, ' ')
              .replace(/\..+/, '')
          });
        }
      }
    }
    return await queryInterface.bulkInsert('likes', likeList, {
      returning: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkDelete('users', null, {});
    return await queryInterface.bulkDelete('articles', null, {});
  }
};
