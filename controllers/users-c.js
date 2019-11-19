const { selectUser } = require("../models/users-m");

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(users => {
      users.length > 1
        ? res.status(200).json({ users })
        : next({ status: 404, msg: "Not Found" });
    })
    .catch(next);
};
