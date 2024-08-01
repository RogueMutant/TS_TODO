import BadRequestError from "../errors/bad_request";
import NotFoundError from "../errors/not-found";
import { StatusCodes } from "http-status-codes";
import users from "../models/users";
import { Request, Response } from "express";
import { customRequest } from "../types/custom";

const register = async (req: customRequest, res: Response) => {
  const user = await users.create({ ...req.body });
  const token = user?.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user?.name }, token });
  console.log(req.user, token);
};

const login = async (req: customRequest, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Invalid credentials provided");
  }
  const user = await users.findOne({ email });
  if (!user) {
    throw new NotFoundError("user does not exist!");
  }
  const token = user?.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user?.name }, token });
  console.log(token);
};

export default {
  register,
  login,
};
