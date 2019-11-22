const {
  updateCommentById,
  exterminateCommentById
} = require("../models/comments-m");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(commentResponse => {
      const comment = commentResponse[0];
      res.status(200).json({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  exterminateCommentById(comment_id)
    .then(comments => {
      res.sendStatus(204);
    })
    .catch(next);
};
