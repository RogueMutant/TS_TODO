require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated";
import { customRequest } from "../types/custom";

// Define the structure of the JWT payload
interface JwtPayload {
  userId: string;
  userName: string;
}

//Use this when using httponly (much secure)
const auth = async (req: customRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthenticatedError("No token provided");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      throw new UnauthenticatedError("Invalid token");
    }

    req.user = { userId: decoded.userId, name: decoded.userName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

//This is to be ised when you are making a request using auth headers
// const auth = async (req: customRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new UnauthenticatedError("No token provided");
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as JwtPayload;

//     if (!decoded) {
//       console.log("wrong token provided");
//       throw new UnauthenticatedError("Invalid token");
//     }

//     req.user = { userId: decoded.userId, name: decoded.userName };
//     next();
//   } catch (error) {
//     // console.log(req.headers, token);
//     // console.log("JWT_SECRET:", process.env.JWT_SECRET);
//     // console.error("JWT verification error:", error);
//     // console.log("Token without verification:", jwt.decode(token));
//     throw new UnauthenticatedError("Not authorized to access this route");
//   }
// };

export default auth;
