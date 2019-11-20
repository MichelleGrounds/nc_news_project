const {
  selectArticleById,
  updateArticle,
  addCommentToArticle,
  selectCommentsByArticleId,
  selectAllArticles,
  doesTopicOrAuthorExist,
  doesArticleExist
} = require("../models/articles-m");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  selectAllArticles(sort_by, order, author, topic)
    .then(articles => {
      if (articles.length < 1) {
        doesTopicOrAuthorExist(author, topic)
          .then(articles => {
            articles.length < 1
              ? next({ status: 404 })
              : res.status(200).json({ articles: [] });
          })
          .catch(next);
      } else {
        res.status(200).json({ articles });
      }
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(responseArticle => {
      const article = responseArticle[0];
      responseArticle.length < 1
        ? next({ status: 404 })
        : res.status(200).json({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then(responseArticle => {
      const article = responseArticle[0];
      responseArticle.length < 1
        ? next({ status: 404 })
        : res.status(200).json({ article });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const newComment = req.body;
  addCommentToArticle(article_id, username, body)
    .then(commentResponse => {
      const comment = commentResponse[0];
      commentResponse.length < 1
        ? next({ status: 404 })
        : res.status(201).json({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  selectCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      if (comments.length < 1) {
        doesArticleExist(article_id)
          .then(articleResponse => {
            articleResponse.length < 1
              ? next({ status: 404 })
              : res.status(200).json({ article: [] });
          })
          .catch(next);
      } else {
        res.status(200).json({ comments });
      }
    })
    .catch(next);
};
