const usersRouter = require("express").Router();
const { getUser } = require("../controllers/users-c");
const { handleDisallowedMethod } = require("../errors");

usersRouter
  .route("/:username")
  .get(getUser)
  .all(handleDisallowedMethod);

module.exports = { usersRouter };
