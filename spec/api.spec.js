process.env.NODE_ENV = "test";

const { expect } = require("chai");

const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  it("GET:405 responds with a 405 error when not allowed method is used on api", () => {
    return request(app)
      .del("/api")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal("Method not allowed");
      });
  });
});
