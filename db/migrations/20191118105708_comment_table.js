exports.up = function(knex) {
  console.log("creating comments table");
  return knex.schema.createTable("comments", commentTable => {
    commentTable.increments("comment_id").primary();
    commentTable.string("author").references("users.username");
    commentTable.integer("article_id").references("articles.article_id");
    commentTable.integer("votes").defaultTo(0);
    commentTable.timestamp("created_at");
    commentTable.text("body").notNullable();
  });
};

exports.down = function(knex) {
  console.log("dropping comments table");
  return knex.schema.dropTable("comments");
};
