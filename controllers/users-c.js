const { selectUser } = require("../models/users-m");

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(users => {
      if (users.length > 0) {
        //console.log(users);
        res.status(200).json({ users });
      } else {
        next({ status: 404, msg: "Not Found" });
      }
    })
    .catch(next);
};
