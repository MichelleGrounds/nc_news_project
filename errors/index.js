exports.handleDisallowedMethod = (req, res, next) => {
  res.status(405).json({ msg: "Method not allowed" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Not Found" });
  } else {
    next(err);
  }
};

exports.handleDatabaseError = (err, req, res, next) => {
  const badRequestCodes = ["22P02"];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  }
};

exports.handleInternalServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
