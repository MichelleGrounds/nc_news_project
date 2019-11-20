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
  describe("/users", () => {
    describe("/:username", () => {
      it("GET:200, responds with a user object", () => {
        return request(app)
          .get("/api/users/rogersop")
          .expect(200)
          .then(({ body }) => {
            expect(body.user.username).to.equal("rogersop");
            expect(body.user).to.be.an("object");
          });
      });
      it("GET:404, when given an non-existent or invalid username returns a 404 not found error", () => {
        return request(app)
          .get("/api/users/jonny")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
    });
  });
});
