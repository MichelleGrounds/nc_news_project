const { selectUser } = require("../models/users-m");

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(users => {
      users.length < 1
        ? next({ status: 404 })
        : res.status(200).json({ users });
    })
    .catch(next);
};
