import bugModel from "../models/bugModel";
import * as express from "express";
import "mongoose";
import statusCode from "../configuration/statusCode";

///// CURD  ------------------------>>>>>>>>>>

//Create new bug
const createBug = async (req: express.Request, res: express.Response): Promise<void> => {
  const bug = new bugModel({
    bugName: req.body.bugName,
    status: req.body.status,
    description: req.body.description,
    //checklist: req.body.checklist,
    comments: req.body.comments,
  });
  console.log("This is the new PorijectName: ", bug);

  try {
    console.log("Waiting user to save.......");
    const response = await bug.save();
    res.status(statusCode.CREATED).send(response);
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error });
  }
};

// get ALL bugs
const getBugs = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log("Getting Projects..........: ");
    const bugs = await bugModel.find();
    res.status(statusCode.OK).send(bugs);
    () => {
      res.json(bugs); // this the response will be send as a json document
      console.log(`this is inside /users.get : ${bugs}`);
    };
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const updateBug = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    if (!req.body) {
      return res.status(statusCode.BAD_REQUEST).send({ message: "Cannot update empty values" });
    }
    const response = await bugModel.findByIdAndUpdate(
      req.params.id,
      {
        bugName: req.body.bugName,
        status: req.body.status,
        description: req.body.description,
        checklist: req.body.checklist,
        comments: req.body.comments,
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
  createBug,
  getBugs,
  updateBug,
};
