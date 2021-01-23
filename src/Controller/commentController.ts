import commentModel from "../models/commentModel";
import * as express from "express";
import "mongoose";
import statusCode from "../configuration/statusCode";

///// CURD  ------------------------>>>>>>>>>>

//Create new comment
const createComment = async (req: express.Request, res: express.Response): Promise<void> => {
  const comment = new commentModel({
    bugId: req.body.bugId,
    userId: req.body.userId,
    text: req.body.text,
  });
  console.log("This is the new PorijectName: ", comment);

  try {
    console.log("Waiting user to save.......");
    const response = await comment.save();
    res.status(statusCode.CREATED).send(response);
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error });
  }
};

// Get all comments
const getComments = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log("Getting Projects..........: ");
    const comment = await commentModel.find();
    res.status(statusCode.OK).send(comment);
    () => {
      res.json(comment); // this the response will be send as a json document
      console.log(`this is inside /users.get : ${comment}`);
    };
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

// Update Comments
const updateComments = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    if (!req.body) {
      return res.status(statusCode.BAD_REQUEST).send({ message: "Cannot update empty values" });
    }
    const response = await commentModel.findByIdAndUpdate(
      req.params.id,
      {
        bugId: req.body.bugId,
        userId: req.body.userId,
        text: req.body.text,
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
  createComment,
  getComments,
  updateComments,
};
