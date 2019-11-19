const { selectArticleById, updateArticle } = require("../models/articles-m");

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
        next(res.status(404).send({ msg: "Not Found" }));
      } else {
        res.status(202).json({ articles });
      }
    })
    .catch(next);
};
