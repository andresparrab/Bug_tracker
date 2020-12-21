import userModel from "../models/userModel";
import * as express from "express";
import "mongoose";
import statusCode from "../configuration/statusCode";

///// CURD  ------------------------>>>>>>>>>>

//Create new user
const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
  const user = new userModel({
    username: req.body.username,
    displayName: req.body.displayName,
    password: req.body.password,
  });
  console.log("This is the new user: ", user);

  try {
    console.log("Waiting user to save.......");
    const response = await user.save();
    res.status(statusCode.CREATED).send(response);
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error });
  }
};

//get ALL users
const getUsers = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log("Getting users..........: ");
    const users = await userModel.find();
    res.status(statusCode.OK).send(users);
    () => {
      res.json(users); // this the response will be send as a json document
      console.log(`this is inside /users.get : ${users}`);
    };
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const updateUser = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    if (!req.body) {
      return res.status(statusCode.BAD_REQUEST).send({ message: "Cannot update empty values" });
    }
    const response = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        displayName: req.body.displayName,
        password: req.body.password,
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
  createUser,
  getUsers,
  updateUser,
};
