const { selectAllEndpoints } = require("../models/api-m");

exports.getAvailableEndpoints = (req, res, next) => {
  const path = "";
  selectAllEndpoints((err, endpoints) => {
    res.status(200).send({ endpoints });
  });
};
