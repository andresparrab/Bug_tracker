import Chai from "chai";
import { describe, it as test } from "mocha";
import app from "../Server";
import chaiHttp from "chai-http";
import { request, response } from "express";
import statusCode from "../configuration/statusCode";
Chai.should();
Chai.use(chaiHttp);

const randomString = Math.random().toString(36).substring(4);
const userID = "5fe05060c83bb1a14f839011";
const project = {
  projectName: randomString,
  owner: randomString,
  users: [randomString, randomString, randomString, randomString],
  bugs: [randomString, randomString, randomString, randomString, randomString, randomString],
};

// const testtingNonExistentRoute = () => {
//   describe("Testing route down not exist", () => {
//     test("Expecting 404 not found", (done) => {
//       Chai.request(app)
//         .get(`/${randomString}`)
//         .end((request, response) => {
//           response.should.have.status(statusCode.NOT_FOUND);
//           done();
//         });
//     });
//   });
// };

const createProject = () => {
  describe(" Testing Create(POST) method for Project entety", () => {
    test("Expecting a Project to be created", (done) => {
      Chai.request(app)
        .post("/project/add")
        .send(project)
        .end((error, response) => {
          response.should.have.status(statusCode.CREATED);
          response.body.should.be.a("object");
          response.body.should.have.property("projectName").eq(project.projectName);
          done();
        });
    });
  });
};

const getProjects = () => {
  describe(" Fetching all Projects(GET)", () => {
    test("Expecting to return all the Projects", (done) => {
      Chai.request(app)
        .get("/project/getProjects")
        .end((error, response) => {
          response.should.have.status(statusCode.OK);
          response.body.should.be.a("array");
          console.log("Then number os projects are: ", response.body.length);
          response.body.length.should.be.eq(response.body.length);
          done();
        });
    });
  });
};

// const updateUserInfo = () => {
//   describe(" Updating(PUT) a user in the database", () => {
//     test("Expecting a user to be updated", (done) => {
//       Chai.request(app)
//         .put(`/user/${userID}`)
//         .send(user)
//         .end((error, response) => {
//           response.should.have.status(statusCode.OK);
//           response.body.should.be.a("object");
//           response.body.should.have.a.property("_id").eq(userID);
//           response.body.should.have.property("username").eq(user.username);
//           response.body.should.have.property("password").eq(user.password);
//           console.log("user after Update", response.body);
//         });
//       done();
//     });
//   });
// };

describe("Testing the user API route", () => {
  createProject();
  //   testtingNonExistentRoute();
  getProjects();

  //   updateUserInfo();
});
