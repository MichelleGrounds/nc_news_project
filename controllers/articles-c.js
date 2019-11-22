const {
  selectArticleById,
  updateArticle,
  addCommentToArticle,
  selectCommentsByArticleId,
  selectAllArticles
} = require("../models/articles-m");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  selectAllArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).json({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(responseArticle => {
      const article = responseArticle[0];
      res.status(200).json({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then(responseArticle => {
      const article = responseArticle[0];
      res.status(200).json({ article });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  addCommentToArticle(article_id, username, body)
    .then(commentResponse => {
      const comment = commentResponse[0];
      res.status(201).json({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  selectCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.status(200).json({ comments });
    })
    .catch(next);
};
