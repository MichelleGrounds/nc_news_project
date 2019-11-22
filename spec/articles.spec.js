process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const { expect } = chai;

const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");

describe("connection", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("/not-a-route returns a 404", () => {
      return request(app)
        .get("/not-a-route")
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.text).to.equal("Route not found");
        });
    });
    it("/api/not-a-route returns a 404", () => {
      return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then(body => {
          expect(body.status).to.equal(404);
          expect(body.text).to.equal("Route not found");
        });
    });
    describe("/articles", () => {
      it("GET:200, responds with an array of article objects without the body", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys(
              "article_id",
              "title",
              "votes",
              "author",
              "topic",
              "created_at",
              "comment_count"
            );
            expect(body.articles.length).to.equal(12);
          });
      });
      it("GET:200, responds with an array of article objects which are sorted by date and descending by default", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).descendingBy("created_at");
          });
      });
      it("GET:200, responds with an array of article objects which can be sorted by any column asc or desc", () => {
        return request(app)
          .get("/api/articles?sort_by=title&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).ascendingBy("title");
          });
      });
      it("GET:200, if there is an author query it filters the articles to the ones from that author", () => {
        return request(app)
          .get("/api/articles?author=rogersop")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].author).to.equal("rogersop");

            expect(body.articles[1].author).to.equal("rogersop");
            expect(body.articles[2].author).to.equal("rogersop");
          });
      });
      it("GET:200, if there is an topic query it filters the articles to the ones from that topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].topic).to.equal("mitch");
            expect(body.articles[4].topic).to.equal("mitch");
          });
      });
      it("GET:200, responds with an empty array if the author exists but has no articles", () => {
        return request(app)
          .get("/api/articles/?author=lurker")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
            expect(body.articles.length).to.equal(0);
          });
      });
      it("GET:200, responds with an empty array if the topic exists but has no articles", () => {
        return request(app)
          .get("/api/articles/?topic=paper")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.eql([]);
            expect(body.articles.length).to.equal(0);
          });
      });
      it("GET:200, when given a non-existing order-by keyword ignore it", () => {
        return request(app)
          .get("/api/articles/?sort_by=author&order=cats")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].topic).to.equal("mitch");
          });
      });
      it("GET:400, responds with Bad Request when given an invalid query name", () => {
        return request(app)
          .get("/api/articles/?sort_by=not-a-column")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      it("GET:404, responds with a 404 error when the author is not in the database", () => {
        return request(app)
          .get("/api/articles/?author=Not-An-Author")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("GET:404, responds with a 404 error when the topic is not in the database", () => {
        return request(app)
          .get("/api/articles/?topic=Not-A-Topic")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      describe("/:article_id", () => {
        it("GET:200, returns an article object", () => {
          return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.be.an("object");
              expect(body.article.article_id).to.equal(2);
              expect(body.article.comment_count).to.equal("0");
              expect(body.article).to.contain.keys(
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
        it("GET:400 given an invalid id responds with a Bad Request", () => {
          return request(app)
            .get("/api/articles/not-an-id")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("PATCH:200, responds with the updated article object", () => {
          return request(app)
            .patch("/api/articles/4")
            .send({ inc_votes: 10 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.be.an("object");
              expect(body.article.votes).to.equal(10);
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
        it("PATCH: 400, non-existent it returns 400", () => {
          return request(app)
            .patch("/api/articles/not-an-id")
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("PATCH: 200, no body returns the initial article unchanged", () => {
          return request(app)
            .patch("/api/articles/2")
            .send({})
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.equal(0);
            });
        });
        it("PATCH: 400, invalid inc_vote on body returns 400", () => {
          return request(app)
            .patch("/api/articles/not-an-id")
            .send({ inc_votes: "cats" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("PATCH:200, additional properties on the requesting body are ignored", () => {
          return request(app)
            .patch("/api/articles/4")
            .send({ inc_votes: 10, author: "lurker" })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.equal(10);
            });
        });
        describe("/comments", () => {
          it("POST:400, no body is included in the requesting body", () => {
            return request(app)
              .post("/api/articles/4/comments")
              .send({
                username: "lurker"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad Request");
              });
          });
          it("POST:400, no username is included in the requesting body", () => {
            return request(app)
              .post("/api/articles/4/comments")
              .send({
                body: "this is a comment"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad Request");
              });
          });
          it("POST:201, responds with the posted comment", () => {
            return request(app)
              .post("/api/articles/4/comments")
              .send({
                username: "lurker",
                body: "Great stuff"
              })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment.article_id).to.equal(4);
                expect(body.comment.votes).to.equal(0);
                expect(body.comment).to.contain.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                );
              });
          });
          it("POST:404, when given a non-existing article_id responds with 404 error", () => {
            return request(app)
              .post("/api/articles/44444/comments")
              .send({
                username: "lurker",
                body: "Great stuff"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal(
                  'Key (article_id)=(44444) is not present in table "articles".'
                );
              });
          });
          it("POST:400, when given an invalid article_id responds with 400 bad request", () => {
            return request(app)
              .post("/api/articles/cats/comments")
              .send({
                username: "lurker",
                body: "Great stuff"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad Request");
              });
          });
          it("POST:404, when given a non-existing username in the requesting body return a 404 error", () => {
            return request(app)
              .post("/api/articles/4/comments")
              .send({
                username: "coopMassive",
                body: "Great stuff"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal(
                  'Key (author)=(coopMassive) is not present in table "users".'
                );
              });
          });
          it("GET:200, responds with an array of comment objects belonging to an article", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments.length).to.equal(13);
                expect(body.comments[0].votes).to.equal(14);
                expect(body.comments[3].votes).to.equal(0);
                expect(body.comments[0].article_id).to.equal(1);
                expect(body.comments[0]).to.contain.keys(
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                );
              });
          });
          it("GET:200, querying comments for an article id, can sort them by created_at descending by default", () => {
            return request(app)
              .get("/api/articles/5/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).descendingBy("created_at");
              });
          });
          it("GET:200, querying comments for an article id, can sort them by any column, ascending or descending", () => {
            return request(app)
              .get("/api/articles/5/comments?sort_by=author&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).ascendingBy("author");
              });
          });
          it("GET:200, given a valid article_id that does not have comments return an empty array", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200)
              .then(({ body }) => {
                console.log(body);
                expect(body.comments).to.eql([]);
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
                expect(body.msg).to.equal("Bad Request");
              });
          });
        });
      });
    });
  });
});
