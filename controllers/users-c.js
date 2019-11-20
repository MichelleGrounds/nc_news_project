const { selectUser } = require("../models/users-m");

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(user => {
      user.length < 1 ? next({ status: 404 }) : res.status(200).json({ user });
    })
    .catch(next);
};
