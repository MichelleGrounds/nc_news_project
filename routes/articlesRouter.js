const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById
} = require("../controllers/articles-c");
const { handleDisallowedMethod } = require("../errors");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handleDisallowedMethod);

module.exports = { articlesRouter };
