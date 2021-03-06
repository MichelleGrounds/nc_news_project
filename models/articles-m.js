const connection = require("../db/connection");

const selectAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic,
  limit = 10,
  p = 1
) => {
  const articles = connection
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

  return Promise.all([articles, doesTopicOrAuthorExist(author, topic)]).then(
    articles => {
      if (articles[0].length === 0 && articles[1].length === 0) {
        return Promise.reject({ status: 404 });
      } else {
        beginSlice = limit * p - limit;
        endSlice = p * limit;
        return articles[0].slice(beginSlice, endSlice);
      }
    }
  );
};

const selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count("comment_id as comment_count")
    .then(article => {
      if (article.length < 1) {
        return Promise.reject({ status: 404 });
      } else return article;
    });
};

const updateArticle = (article_id, inc_votes = 0) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .then(() => {
      return selectArticleById(article_id);
    })
    .then(article => {
      if (article.length < 1) {
        return Promise.reject({ status: 404 });
      } else return article;
    });
};

const addCommentToArticle = (article_id, username, body) => {
  const insertComment = {};
  insertComment.article_id = article_id;
  insertComment.author = username;
  insertComment.body = body;

  return connection
    .insert(insertComment)
    .into("comments")
    .returning("*")
    .then(comment => {
      if (comment.length < 1) {
        return Promise.reject({ status: 404 });
      } else return comment;
    });
};

const selectCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc",
  limit = 10,
  p = 1
) => {
  const comments = connection
    .select("*")
    .from("comments")
    .where("comments.article_id", article_id)
    .orderBy(sort_by, order);

  return Promise.all([comments, doesArticleExist(article_id)]).then(
    comments => {
      if (comments[0].length === 0 && comments[1].length === 0) {
        return Promise.reject({ status: 404 });
      } else {
        beginSlice = limit * p - limit;
        endSlice = p * limit;
        return comments[0].slice(beginSlice, endSlice);
      }
    }
  );
};

const doesTopicOrAuthorExist = (author, topic) => {
  if (author) {
    return connection
      .select("username")
      .from("users")
      .where("username", author);
  }
  if (topic) {
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

//set up a new function, it limits author and topic, and counts the total articles, doesn't need a group by
const totalCountArticles = (author, topic) => {
  return connection
    .select("*")
    .from("articles")
    .modify(function(query) {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .groupBy("article_id")
    .count("article_id");
};

const countComments = article_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", article_id)
    .groupBy("comment_id")
    .count("comment_id");
};

module.exports = {
  selectArticleById,
  updateArticle,
  addCommentToArticle,
  selectCommentsByArticleId,
  selectAllArticles,
  doesTopicOrAuthorExist,
  doesArticleExist,
  totalCountArticles,
  countComments
};
