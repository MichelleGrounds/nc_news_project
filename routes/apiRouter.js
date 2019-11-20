const apiRouter = require("express").Router();
const { topicsRouter } = require("../routes/topicsRouter");
const { usersRouter } = require("../routes/usersRouter");
const { articlesRouter } = require("../routes/articlesRouter");
const { commentsRouter } = require("../routes/commentsRouter");
const { handleDisallowedMethod } = require("../errors");
//const { getAvailableEndpoints } = require("../controllers/api-c");

apiRouter
  .route("/")
  //.get(getAvailableEndpoints)
  .all(handleDisallowedMethod);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = { apiRouter };
