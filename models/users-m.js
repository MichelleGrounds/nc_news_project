const connection = require("../db/connection");

exports.selectUser = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
};
