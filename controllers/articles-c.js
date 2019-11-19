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
    .then(articles => {
      articles.length < 1
        ? next(res.status(404).json({ msg: "Not Found" }))
        : res.status(202).json({ articles });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then(articles => {
      articles.length < 1
        ? next(res.status(404).json({ msg: "Not Found" }))
        : res.status(202).json({ articles });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  addCommentToArticle(article_id, newComment)
    .then(comments => {
      // comments.length < 1
      //   ? next(res.status(404).json({ msg: "Not Found" }))
      //   : res.status(201).json({ comments });

      //console.log(comments, "<<controller then");
      if (comments.length < 1) {
        //console.log(comments, "<<if statement controller");
        next(res.status(404).json({ msg: "Not Found" }));
      } else {
        res.status(201).json({ comments });
      }
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  selectCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      comments.length < 1
        ? next(res.status(404).json({ msg: "Not Found" }))
        : res.status(200).json({ comments });
    })
    .catch(next);
};
