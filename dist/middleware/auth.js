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
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new unauthenticated_1.default("No token provided");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.log("wrong token provided");
            throw new unauthenticated_1.default("Invalid token");
        }
        req.user = { userId: decoded.userId, name: decoded.userName };
        next();
    }
    catch (error) {
        // console.log(req.headers, token);
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        // console.error("JWT verification error:", error);
        // console.log("Token without verification:", jwt.decode(token));
        throw new unauthenticated_1.default("Not authorized to access this route");
    }
});
exports.default = auth;
