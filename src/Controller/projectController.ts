import projectModel from "../models/projectModel";
import * as express from "express";
import moongose from "mongoose";
import statusCode from "../configuration/statusCode";
import bugModel from "../models/bugModel";
import userModel from "../models/userModel";

//import BugModel from "models/bugModel";

///// CURD  ------------------------>>>>>>>>>>

//Create new project
const createProject = async (req: express.Request, res: express.Response): Promise<void> => {
  const bugss = await bugModel.find();
  const users = await userModel.find();
  console.log("populating the bugs");
  //console.log(bugss._id);
  //console.log("THE USERS", users.displayName);
  const project = new projectModel({
    projectName: req.body.projectName,
    owner: req.body.owner,
    users: users,
    //bugslist: await projectModel.populate("bugslist"),
    bugslist: bugss,
  });
  console.log("This is the new PorjectName!!!!////: ", project);

  try {
    const response = await projectModel.findOne({ projectName: "avalon1" }).populate("bugslist");

    console.log("get populated", response);

    console.log("Waiting user to save.......");
    await project.save();
    // const response = await project.save();
    console.log("saved SUCESSFULLY");

    res.status(statusCode.CREATED).send(response);
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error });
  }
};

// get ALL projects
const getProjects = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log("Getting Projects..........: ");
    console.log("populating the bugs");
    const projects = await projectModel
      .findOne({ projectName: "avalon1" })
      .populate("bugslist users", { bugName: 1, username: 1 });

    console.log("this is projects", projects);
    res.status(statusCode.OK).send(projects);
    () => {
      res.json(projects); // this the response will be send as a json document
      console.log(`this is inside /users.get : ${projects}`);
    };
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

// Update Project
const updateProject = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    if (!req.body) {
      return res.status(statusCode.BAD_REQUEST).send({ message: "Cannot update empty values" });
    }
    const response = await projectModel.findByIdAndUpdate(
      req.params.id,
      {
        projectName: req.body.projectName,
        owner: req.body.owner,
        users: req.body.users,
        bugs: req.body.bugs,
      },
      { new: true }
    );
    res.status(statusCode.OK).send(response);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({
      message: "Error accured while trying to updade he values of the user id " + req.params.id,
      error: error.message,
    });
  }
};

export default {
  createProject,
  getProjects,
  updateProject,
};
