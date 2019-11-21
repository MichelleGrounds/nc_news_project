process.env.NODE_ENV = "test";

const { expect } = require("chai");

const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");

describe("connection set up", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("GET:405 responds with a 405 error when not allowed method is used on api", () => {
      return request(app)
        .del("/api")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method not allowed");
        });
    });
    it.only("GET:200, responds with a JSON object containing all available api endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).to.be.an("object");
        });
    });
  });
});
