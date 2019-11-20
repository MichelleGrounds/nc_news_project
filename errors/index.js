exports.invalidRoute = (req, res, next) => {
  res.status(404).send("Route not found");
};

exports.handleDisallowedMethod = (req, res, next) => {
  res.status(405).json({ msg: "Method not allowed" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  err.status ? res.status(404).send({ msg: "Not Found" }) : next(err);
};

exports.handleDatabaseError = (err, req, res, next) => {
  const notFoundCodes = ["23503"];
  const badRequestCodes = ["22P02", "42703"];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else if (notFoundCodes.includes(err.code)) {
    res.status(404).send({ msg: err.detail });
  } else {
    next(err);
  }
};

exports.handleInternalServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
