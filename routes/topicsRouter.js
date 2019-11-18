const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-c");
const { handleDisallowedMethod } = require("../errors/index");
topicsRouter
  .route("/")
  .get(getTopics)
  .all(handleDisallowedMethod);

module.exports = { topicsRouter };
