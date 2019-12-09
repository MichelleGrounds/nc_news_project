const { selectUser, selectAllUsers } = require("../models/users-m");

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(userResponse => {
      const user = userResponse[0];
      res.status(200).json({ user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  selectAllUsers().then(users => {
    res.status(200).json({ users });
  });
};
