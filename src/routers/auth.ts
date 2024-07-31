import express, { Router } from "express";
import userAuth from "../controllers/auth";

const todoAuth: Router = express.Router();

todoAuth.route("/register").post(userAuth.register);
todoAuth.route("/login").post(userAuth.login);

export default todoAuth;
