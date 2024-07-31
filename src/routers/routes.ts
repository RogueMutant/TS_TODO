import express, { Router } from "express";
import taskController from "../controllers/task";

const todoRoutes: Router = express.Router();
todoRoutes
  .route("/")
  .get(taskController.getAllTask)
  .post(taskController.createTask);
todoRoutes
  .route("/:id")
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export default todoRoutes;
