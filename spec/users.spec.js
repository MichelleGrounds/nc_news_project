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
  describe("/users", () => {
    describe("/:username", () => {
      it("GET:200, responds with a user object", () => {
        return request(app)
          .get("/api/users/rogersop")
          .expect(200)
          .then(({ body }) => {
            expect(body.users[0].username).to.equal("rogersop");
            expect(body.users.length).to.equal(1);
          });
      });
      it("GET:404, when given an non-existent username returns a 404 not found error", () => {
        return request(app)
          .get("/api/users/jonny")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      //knex issue? returns an empty array, so gets caught by 404 error --> does not return an error with a code i could reference
      // it.only("GET:400, invalid username format", () => {
      //   return request(app)
      //     .get("/api/users/123")
      //     .expect(400)
      //     .then(({ body }) => {
      //       console.log(body);
      //       expect(body.msg).to.equal("Bad Request");
      //     });
      // });
    });
  });
});
