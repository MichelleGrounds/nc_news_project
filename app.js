const express = require("express");
const app = express();
const { apiRouter } = require("./routes/apiRouter");
const {
  handleCustomErrors,
  handleInternalServerError,
  handleDatabaseError,
  invalidRoute
} = require("./errors");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", invalidRoute);

app.use(handleCustomErrors);
app.use(handleDatabaseError);
app.use(handleInternalServerError);

module.exports = app;
