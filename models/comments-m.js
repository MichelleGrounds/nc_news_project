const connection = require("../db/connection");

const updateCommentById = (comment_id, inc_votes = 0) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length < 1) {
        return Promise.reject({ status: 404 });
      } else return comment;
    });
};

const exterminateCommentById = comment_id => {
  return connection
    .from("comments")
    .where("comment_id", comment_id)
    .del()
    .then(comments => {
      if (comments === 0) {
        return Promise.reject({ status: 404 });
      } else {
        return comments;
      }
    });
};
module.exports = { updateCommentById, exterminateCommentById };
