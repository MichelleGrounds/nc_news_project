const { selectTopics } = require("../models/topics-m");

exports.getTopics = (req, res, next) => {
  selectTopics().then(topics => {
    res.status(200).json({ topics });
  });
};
