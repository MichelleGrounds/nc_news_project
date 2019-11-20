const { connection } = require("../db/connection");

const doesTopicOrAuthorExist = (author, topic) => {
  if (author) {
    return connection
      .select("username")
      .from("users")
      .where("username", author);
  } else {
    return connection
      .select("slug")
      .from("topics")
      .where("slug", topic);
  }
};

const doesArticleExist = article_id => {
  return connection
    .select("article_id")
    .from("articles")
    .where("article_id", article_id);
};

const selectAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.votes",
      "articles.author",
      "articles.topic",
      "articles.created_at"
    )
    .from("articles")
    .modify(function(query) {
      if (author) {
        query.where("articles.author", author);
      }
      if (topic) {
        query.where("articles.topic", topic);
      }
    })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .count("comment_id as comment_count")
    .orderBy(sort_by, order);
};

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

const addCommentToArticle = (article_id, username, body) => {
  const insertComment = {};
  insertComment.article_id = article_id;
  insertComment.author = username;
  insertComment.body = body;

  return connection
    .insert(insertComment)
    .into("comments")
    .returning("*");
};

const selectCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", article_id)
    .orderBy(sort_by, order);
};

module.exports = {
  selectArticleById,
  updateArticle,
  addCommentToArticle,
  selectCommentsByArticleId,
  selectAllArticles,
  doesTopicOrAuthorExist,
  doesArticleExist
};
