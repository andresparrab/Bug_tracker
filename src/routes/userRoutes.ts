import { Application } from "express";

import userController from "../Controller/userController";
const routes = (app: Application): void => {
  app.post("/user/add", userController.createUser);
  app.get("/user/getUsers", userController.getUsers);
  app.put("/user/:id", userController.updateUser);
};

export default {
  routes,
};
