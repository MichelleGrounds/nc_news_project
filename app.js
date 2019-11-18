const express = require("express");
const app = express();
const { apiRouter } = require("./routes/apiRouter");

// const {  } = require("./errors/index");
app.use(express.json());

app.use("/api", apiRouter);

module.exports = { app };
