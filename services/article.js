const {
  Article,
  ArticleLinksTag,
  Like,
  Tag,
  View,
  sequelize
} = require('../models');

exports.getArticleList = async (category, pageNumber) => {
  const CONTENTS_PER_PAGE = 10;
  const OFFSET = pageNumber * CONTENTS_PER_PAGE;
  const QUERY = orderBy => `SELECT join1. *,
      COUNT ( comment.article_id ) AS comment_count 
  FROM ( SELECT articles. *,
      COUNT ( likes.article_id ) AS like_count 
  FROM articles 
  INNER JOIN likes ON articles.id = likes.article_id GROUP BY articles.id ) AS join1 
  INNER JOIN comment ON join1.id = comment.article_id GROUP BY join1.id 
  ORDER BY ${orderBy} DESC LIMIT ${CONTENTS_PER_PAGE} OFFSET ${OFFSET}`;

  if (category === 'new') {
    const result = await sequelize.query(QUERY('createdAt'));
    return result[0];
  } else if (category === 'hot') {
    const result = await sequelize.query(QUERY('like_count'));
    return result[0];
  } else {
    throw new Error('Unexpected category name.');
  }
};

exports.createArticle = async article => {
  const createdArticle = await Article.create({
    title: article.title,
    content: article.content,
    // eslint-disable-next-line
    video_id: article.videoId,
    // eslint-disable-next-line
    author_id: article.userId
  });
  for (let tag of article.tags) {
    const createdTag = await Tag.findOrCreate({
      where: {
        content: tag
      }
    });
    await ArticleLinksTag.findOrCreate({
      where: {
        // eslint-disable-next-line
        article_id: createdArticle.id,
        // eslint-disable-next-line
        tag_id: createdTag[0].id
      }
    });
  }
};

exports.getArticle = async articleId => {
  await Article.update(
    // eslint-disable-next-line
    { view_count: sequelize.literal('view_count + 1') },
    { where: { id: articleId } }
  );
  const article = await Article.findOne({
    where: {
      id: articleId
    }
  });
  const likeCnt = await Like.count({
    where: {
      // eslint-disable-next-line
      article_id: articleId
    }
  });
  const query = `SELECT tags.content FROM article_links_tag AS link 
                  INNER JOIN tags ON link.tag_id = tags.id 
                  WHERE article_id = ${articleId}`;
  const tagList = await sequelize.query(query);

  return {
    ...article.dataValues,
    // eslint-disable-next-line
    like_count: likeCnt,
    tags: tagList[0]
  };
};

exports.updateArticle = async article => {
  const updatedArticle = await Article.update(
    {
      title: article.title,
      content: article.content,
      // eslint-disable-next-line
      video_id: article.video_id,
      // eslint-disable-next-line
      author_id: article.userId
    },
    { where: { id: article.id }, returning: true }
  );
  await ArticleLinksTag.destroy({
    where: {
      // eslint-disable-next-line
      article_id: article.id
    }
  });
  for (let tag of article.tags) {
    const createdTag = await Tag.findOrCreate({
      where: {
        content: tag
      }
    });
    await ArticleLinksTag.findOrCreate({
      where: {
        // eslint-disable-next-line
        article_id: article.id,
        // eslint-disable-next-line
        tag_id: createdTag[0].id
      }
    });
  }
};

exports.deleteArticle = async articleId => {
  Article.destroy({ where: { id: articleId } });
};
