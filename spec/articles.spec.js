process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
const { connection } = require("../db/connection");
const { app } = require("../app");

describe.only("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      it("GET:200, returns an array with an article object", () => {
        return request(app)
          .get("/api/articles/4")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.articles[0].article_id).to.equal(4);
            expect(body.articles.length).to.equal(1);
            expect(body.articles[0]).to.contain.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "author",
              "topic",
              "created_at",
              "comment_count"
            );
          });
      });
      it("GET:404, when given a non-existing article-id return a 404 error", () => {
        return request(app)
          .get("/api/articles/9999")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("DELETE:405, when given a disallowed method return 405 method not allowed", () => {
        return request(app)
          .delete("/api/articles/4")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method not allowed");
          });
      });
      it("GET:400", () => {
        return request(app)
          .get("/api/articles/not-an-id")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });

      it("PATCH:202, responds with the updated article object", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({ inc_votes: 10 })
          .expect(202)
          .then(({ body }) => {
            expect(body.articles[0].votes).to.equal(10);
          });
      });
      it("PATCH:404, responds with a 404 error when given a non-existent article_id", () => {
        return request(app)
          .patch("/api/articles/4444")
          .send({ inc_votes: 10 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("PATCH:400, responds with a 400 error when given an invalid article_id", () => {
        return request(app)
          .patch("/api/articles/not-an-id")
          .send({ inc_votes: 10 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      describe.only("/comments", () => {
        it("POST:201, responds with the posted comment", () => {
          return request(app)
            .post("/api/articles/4/comments")
            .send({
              username: "lurker",
              body: "Great stuff"
            })
            .expect(201)
            .then(({ body }) => {
              console.log(body);
            });
        });
      });
    });
  });
});
