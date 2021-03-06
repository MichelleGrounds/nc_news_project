const usersRouter = require("express").Router();
const { getUser, getAllUsers } = require("../controllers/users-c");

const { handleDisallowedMethod } = require("../errors");

usersRouter
  .route("/")
  .get(getAllUsers)
  .all(handleDisallowedMethod);

usersRouter
  .route("/:username")
  .get(getUser)
  .all(handleDisallowedMethod);

module.exports = { usersRouter };
