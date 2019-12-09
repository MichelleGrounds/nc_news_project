const connection = require("../db/connection");

exports.selectUser = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (user.length < 1) {
        return Promise.reject({ status: 404 });
      } else return user;
    });
};

exports.selectAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then(users => {
      return users;
    });
};
