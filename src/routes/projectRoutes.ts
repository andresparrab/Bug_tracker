import { Application } from "express";

import projectController from "../Controller/projectController";
const routes = (app: Application): void => {
  app.post("/project/add", projectController.createProject);
  app.get("/project/getProjects", projectController.getProjects);
  app.put("/project/:id", projectController.updateProject);
};

export default {
  routes,
};
