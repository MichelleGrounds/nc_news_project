const usersRouter = require("express").Router();

usersRouter.route("/:username").get(getUser);
