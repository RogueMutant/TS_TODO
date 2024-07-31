import { Request, Response } from "express";
import TASK from "../models/tasks";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad_request";
import NotFoundError from "../errors/not-found";
import { customRequest } from "../types/custom";

const getAllTask = async (req: customRequest, res: Response): Promise<void> => {
  const tasks = await TASK.find({ createdBy: req?.user?.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req: customRequest, res: Response): Promise<void> => {
  const {
    user: userId,
    params: { id: taskId },
  } = req;

  const task = await TASK.findOne({ _id: taskId, createdBy: userId });

  if (!task) {
    throw new NotFoundError(`No task with id: ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req: customRequest, res: Response): Promise<void> => {
  req.body.createdBy = req?.user?.userId;
  const task = await TASK.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "New Task created", task });
  console.log("task created successfully", req);
};

const updateTask = async (req: customRequest, res: Response): Promise<void> => {
  const {
    body: { title, description },
    user: userId,
    params: { id: taskId },
  } = req;

  if (title === "" || description === "") {
    throw new BadRequestError("Title or description cannot be empty");
  }

  const task = await TASK.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new NotFoundError(`No task with the id: ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req: customRequest, res: Response): Promise<void> => {
  const {
    user: userId,
    params: { id: taskId },
  } = req;

  const task = await TASK.findByIdAndDelete({ _id: taskId, createdBy: userId });

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Deleted the task" });
};

export default {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
