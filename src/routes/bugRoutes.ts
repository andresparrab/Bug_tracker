import { Application } from "express";

import bugController from "../Controller/bugController";
const routes = (app: Application): void => {
  app.post("/bug/add", bugController.createBug);
  app.get("/bug/getbugs", bugController.getBugs);
  app.put("/bug/:id", bugController.updateBug);
};

export default {
  routes,
};
