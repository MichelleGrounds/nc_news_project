const {
  updateCommentById,
  exterminateCommentById
} = require("../models/comments-m");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comments => {
      comments.length < 1
        ? next({ status: 404 })
        : res.status(202).json({ comments });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  exterminateCommentById(comment_id)
    .then(comments => {
      comments === 1
        ? res.sendStatus(204)
        : next({ status: 404 })
    })
    .catch(next);
};
