const commentsRouter = require("express").Router();
const { patchCommentById } = require("../controllers/comments-c");
const { handleDisallowedMethod } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .all(handleDisallowedMethod);

module.exports = { commentsRouter };
