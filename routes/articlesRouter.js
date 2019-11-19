const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles-c");
const { handleDisallowedMethod } = require("../errors");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(handleDisallowedMethod);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handleDisallowedMethod);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handleDisallowedMethod);

module.exports = { articlesRouter };
