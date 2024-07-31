"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_1 = __importDefault(require("./not-found"));
const custom_error_1 = __importDefault(require("./custom-error"));
const bad_request_1 = __importDefault(require("./bad_request"));
const unauthenticated_1 = __importDefault(require("./unauthenticated"));
exports.default = {
    NotFoundError: not_found_1.default,
    CustomAPIError: custom_error_1.default,
    BadRequestError: bad_request_1.default,
    UnauthenticatedError: unauthenticated_1.default
};
