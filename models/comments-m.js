const { connection } = require("../db/connection");

const updateCommentById = (comment_id, inc_votes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*");
};

const exterminateCommentById = comment_id => {
  return connection
    .from("comments")
    .where("comment_id", comment_id)
    .del();
};
module.exports = { updateCommentById, exterminateCommentById };
