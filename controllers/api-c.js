//const apiEndpoints = require("../controllers/")

exports.getAvailableEndpoints = (req, res, next) => {
    res.status(200).send({endpoints: apiEndpoints})
}
