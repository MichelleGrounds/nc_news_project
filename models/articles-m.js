const { connection } = require("../db/connection");

exports.selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count("comment_id as comment_count");
};

exports.updateArticle = (article_id, inc_votes) => {
  console.log(inc_votes);
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*");
};
