import Chai from "chai";
import { describe, it as test } from "mocha";
import app from "../Server";
import chaiHttp from "chai-http";
import { request, response } from "express";
import statusCode from "../configuration/statusCode";
Chai.should();
Chai.use(chaiHttp);

const randomString = Math.random().toString(36).substring(7);
const userID = "5fe05060c83bb1a14f839011";
const user = {
  username: randomString,
  displayName: randomString,
  password: randomString,
};

const testtingNonExistentRoute = () => {
  describe("Testing route down not exist", () => {
    test("Expecting 404 not found", (done) => {
      Chai.request(app)
        .get(`/${randomString}`)
        .end((request, response) => {
          response.should.have.status(statusCode.NOT_FOUND);
          done();
        });
    });
  });
};

const createUser = () => {
  describe(" Testing Create(POST) method for user entety", () => {
    test("Expecting a user to be created", (done) => {
      Chai.request(app)
        .post("/user/add")
        .send(user)
        .end((error, response) => {
          response.should.have.status(statusCode.CREATED);
          response.body.should.be.a("object");
          response.body.should.have.property("username").eq(user.username);
          done();
        });
    });
  });
};

const getUsers = () => {
  describe(" Fetching all users(GET)", () => {
    test("Expecting to return all the users", (done) => {
      Chai.request(app)
        .get("/user/getUsers")
        .end((error, response) => {
          response.should.have.status(statusCode.OK);
          response.body.should.be.a("array");
          console.log("Then number os users are: ", response.body.length);
          response.body.length.should.be.eq(response.body.length);
          done();
        });
    });
  });
};

const updateUserInfo = () => {
  describe(" Updating(PUT) a user in the database", () => {
    test("Expecting a user to be updated", (done) => {
      Chai.request(app)
        .put(`/user/${userID}`)
        .send(user)
        .end((error, response) => {
          response.should.have.status(statusCode.OK);
          response.body.should.be.a("object");
          response.body.should.have.a.property("_id").eq(userID);
          response.body.should.have.property("username").eq(user.username);
          response.body.should.have.property("password").eq(user.password);
          console.log("user after Update", response.body);
        });
      done();
    });
  });
};

describe("Testing the user API route", () => {
  testtingNonExistentRoute();
  getUsers();
  createUser();
  updateUserInfo();
});
