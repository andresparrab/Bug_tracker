import { Application } from "express";

import userController from "../Controller/userController";
const routes = (app: Application): void => {
  app.post("/user/add", userController.createUser);
  app.get("/user/getUsers", userController.getUsers);
  app.put("/user/:id", userController.updateUser);
  app.delete("/user/:id", userController.deleteUserById);
};

export default {
  routes,
};
