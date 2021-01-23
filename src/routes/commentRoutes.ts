import { Application } from "express";

import commentController from "../Controller/commentController";
const routes = (app: Application): void => {
  app.post("/comment/add", commentController.createComment);
  app.get("/comment/getComments", commentController.getComments);
  app.put("/comment/:id", commentController.updateComments);
};

export default {
  routes,
};
