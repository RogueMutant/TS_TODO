"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../models/tasks"));
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad_request"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tasks = yield tasks_1.default.find({ createdBy: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId }).sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({ tasks, count: tasks.length });
});
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: userId, params: { id: taskId }, } = req;
    const task = yield tasks_1.default.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
        throw new not_found_1.default(`No task with id: ${taskId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.createdBy = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const task = yield tasks_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "New Task created", task });
    console.log("task created successfully", req);
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { title, description }, user: userId, params: { id: taskId }, } = req;
    if (title === "" || description === "") {
        throw new bad_request_1.default("Title or description cannot be empty");
    }
    const task = yield tasks_1.default.findByIdAndUpdate({ _id: taskId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!task) {
        throw new not_found_1.default(`No task with the id: ${taskId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ task });
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: userId, params: { id: taskId }, } = req;
    const task = yield tasks_1.default.findByIdAndDelete({ _id: taskId, createdBy: userId });
    if (!task) {
        throw new not_found_1.default(`No task with id ${taskId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Deleted the task" });
});
exports.default = {
    getAllTask,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
