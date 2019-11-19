const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId
} = require("../controllers/articles-c");
const { handleDisallowedMethod } = require("../errors");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handleDisallowedMethod);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .all(handleDisallowedMethod);

module.exports = { articlesRouter };
