process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = require("chai");

const request = require("supertest");
const { connection } = require("../db/connection");
const { app } = require("../app");
