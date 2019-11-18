const apiRouter = require("express").Router();
const { topicsRouter } = require("../routes/topicsRouter");
const { usersRouter } = require("../routes/usersRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

module.exports = { apiRouter };
