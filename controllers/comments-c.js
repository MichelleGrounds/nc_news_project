const { updateCommentById } = require("../models/comments-m");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comments => {
      if (comments.length < 1) {
        next(res.status(404).json({ msg: "Not Found" }));
      } else {
        res.status(202).json({ comments });
      }
    })
    .catch(next);
};
