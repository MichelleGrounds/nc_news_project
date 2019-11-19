const {
  selectArticleById,
  updateArticle,
  addCommentToArticle,
  selectCommentsByArticleId
} = require("../models/articles-m");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(articles => {
      if (articles.length < 1) {
        next(res.status(404).json({ msg: "Not Found" }));
      } else {
        res.status(200).json({ articles });
      }
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then(articles => {
      if (articles.length < 1) {
        next(res.status(404).json({ msg: "Not Found" }));
      } else {
        res.status(202).json({ articles });
      }
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  addCommentToArticle(article_id, newComment)
    .then(comments => {
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
      if (comments.length < 1) {
        next(res.status(404).json({ msg: "Not Found" }));
      } else {
        res.status(200).json({ comments });
      }
    })
    .catch(next);
};
