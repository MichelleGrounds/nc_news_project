const { selectAllEndpoints } = require("../models/api-m");

exports.getAvailableEndpoints = (req, res, next) => {
  selectAllEndpoints((err, endpoints) => {
    res.status(200).send({ endpoints });
  }).catch(next);
};
