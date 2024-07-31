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
const bad_request_1 = __importDefault(require("../errors/bad_request"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const http_status_codes_1 = require("http-status-codes");
const users_1 = __importDefault(require("../models/users"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.create(Object.assign({}, req.body));
    const token = user === null || user === void 0 ? void 0 : user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user === null || user === void 0 ? void 0 : user.name }, token });
    console.log(req.user, token);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new bad_request_1.default("Invalid credentials provided");
    }
    const user = yield users_1.default.findOne({ email });
    if (!user) {
        throw new not_found_1.default("user does not exist!");
    }
    const token = user === null || user === void 0 ? void 0 : user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user === null || user === void 0 ? void 0 : user.name }, token });
    console.log(req.user, token);
});
exports.default = {
    register,
    login,
};
