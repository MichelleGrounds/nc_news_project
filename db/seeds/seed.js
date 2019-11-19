const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");
const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  const topicsInsertions = knex("topics").insert(topicData);
  const usersInsertions = knex("users").insert(userData);

  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const articleDataWithConvertedTimetamps = formatDates(articleData);

      return knex("articles")
        .insert(articleDataWithConvertedTimetamps)
        .returning("*");
    })
    .then(articleInsertions => {
      //ref object -> {article title: id}
      const refObj = makeRefObj(articleInsertions);
      //function to format the comment data, using refObj
      const correctedCommentData = formatComments(commentData, refObj);
      //inserting corrected Data into table
      return knex("comments").insert(correctedCommentData);
    });
};
