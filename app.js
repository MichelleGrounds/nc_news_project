const express = require("express");
const app = express();
const { apiRouter } = require("./routes/apiRouter");

const {
  handleCustomErrors,
  handleInternalServerError,
  handleDatabaseError
} = require("./errors");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleDatabaseError);
app.use(handleInternalServerError);

module.exports = { app };
