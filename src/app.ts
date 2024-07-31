require("dotenv").config();
require("express-async-errors");
import express, { Application } from "express";
import notFoundMiddleware from "./middleware/not_found";
import errorHandlerMiddleware from "./middleware/errorHandler";
import todoRoute from "./routers/routes";
import todoAuth from "./routers/auth";
import authentiicateUsers from "./middleware/auth";

const connectDB = require("./db/connect");
const app: Application = express();
app.use(express.static("./public"));
app.use(express.json());

app.use("/home/auth", todoAuth);
app.use("/home/todo", authentiicateUsers, todoRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
