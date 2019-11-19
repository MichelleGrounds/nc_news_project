process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const { expect } = chai;

const request = require("supertest");
const { connection } = require("../db/connection");
const { app } = require("../app");
