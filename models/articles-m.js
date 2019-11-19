const { connection } = require("../db/connection");

const selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count("comment_id as comment_count");
};

const updateArticle = (article_id, inc_votes) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*");
};

const addCommentToArticle = (article_id, newComment) => {
  newComment.article_id = article_id;
  newComment.author = newComment.username;
  delete newComment.username;

  return connection
    .insert(newComment)
    .into("comments")
    .returning("*");
};

module.exports = { selectArticleById, updateArticle, addCommentToArticle };
