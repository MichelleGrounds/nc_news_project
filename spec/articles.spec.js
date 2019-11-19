process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const { expect } = chai;

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
              expect(body.comments[0].article_id).to.equal(4);
              expect(body.comments[0]).to.contain.keys(
                "comment_id",
                "author",
                "article_id",
                "votes",
                "created_at",
                "body"
              );
            });
        });
        // it("POST:404, when given a non-existing article_id return 404 not found", () => {
        //   return request(app)
        //     .post("/api/articles/44444/comments")
        //     .send({
        //       username: "lurker",
        //       body: "Great stuff"
        //     })
        //     .expect(404)
        //     .then(({ body }) => {
        //       console.log(body, "<<test spec file");
        //       expect(body.msg).to.equal("Not Found");
        //     });
        // });
        it("GET:200, responds with an array of comment objects belonging to an article", () => {
          return request(app)
            .get("/api/articles/5/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments.length).to.equal(2);
              expect(body.comments[0].article_id).to.equal(5);
              expect(body.comments[0]).to.contain.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
            });
        });
        it("Get:200, querying comments for an article id, can sort them by created_at descending by default", () => {
          return request(app)
            .get("/api/articles/5/comments")
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body.comments).descendingBy("created_at");
            });
        });
        it("Get:200, querying comments for an article id, can sort them by any column, ascending or descending", () => {
          return request(app)
            .get("/api/articles/5/comments?sort_by=author&order=asc")
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body.comments).ascendingBy("author");
            });
        });
        it("GET:404, given a non-existent article id returns a 404 not found", () => {
          return request(app)
            .get("/api/articles/55555/comments")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Not Found");
            });
        });
        it("GET:400, given an invalid article id returns a 400 bad request", () => {
          return request(app)
            .get("/api/articles/not-an-id/comments")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("GET:400, responds with Bad Request when given an invalid query name", () => {
          return request(app)
            .get("/api/articles/5/comments?sort_by=not-a-column")
            .expect(400)
            .then(({ body }) => {
              console.log(body);
            });
        });
      });
    });
  });
});
