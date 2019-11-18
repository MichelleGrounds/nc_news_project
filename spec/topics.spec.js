process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = require("chai");

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
  describe("/topics", () => {
    it("GET:200 responds with topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).to.equal(3);
          expect(body.topics[0].slug).to.equal("mitch");
          expect(body.topics[1].slug).to.equal("cats");
          expect(body.topics[2].slug).to.equal("paper");
        });
    });
    it("DELETE:405, method not allowed", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method not allowed");
        });
    });
  });
});
