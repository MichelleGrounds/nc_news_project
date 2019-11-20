process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const { expect } = chai;

const request = require("supertest");
const { connection } = require("../db/connection");
const { app } = require("../app");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/comments", () => {
    describe("/:comment_id", () => {
      it("PATCH:200, responds with an object that has an updated vote counter", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ inc_votes: 10 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(24);
          });
      });
      it("PATCH:200, responds with an object that has an updated vote counter by decrementing the vote", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ inc_votes: -10 })
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.comment[0].votes).to.equal(4);
          });
      });
      it("PATCH:404, responds with a 404 error when the article id cannot be found", () => {
        return request(app)
          .patch("/api/comments/22222")
          .send({ inc_votes: -10 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("PATCH:400, responds with a 400 error when the article id is invalid", () => {
        return request(app)
          .patch("/api/comments/not-an-id")
          .send({ inc_votes: -10 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });

      it("DELETE:204, responds with no content when a comment is deleted by id", () => {
        return request(app)
          .del("/api/comments/4")
          .expect(204);
      });
      it("DELETE:404, when given a non-existent id responds with 404 not found", () => {
        return request(app)
          .del("/api/comments/444444")
          .expect(404)
          .then(({ body }) => {
            console.log(body);
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("DELETE:400, when given an invalid id responds with 400", () => {
        return request(app)
          .del("/api/comments/not-an-id")
          .expect(400)
          .then(({ body }) => {
            console.log(body);
            expect(body.msg).to.equal("Bad Request");
          });
      });
    });
  });
});
