"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../controllers/task"));
const todoRoutes = express_1.default.Router();
todoRoutes
    .route("/")
    .get(task_1.default.getAllTask)
    .post(task_1.default.createTask);
todoRoutes
    .route("/:id")
    .get(task_1.default.getTask)
    .patch(task_1.default.updateTask)
    .delete(task_1.default.deleteTask);
exports.default = todoRoutes;
