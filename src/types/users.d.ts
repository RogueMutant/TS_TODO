import mongoose, { Document } from "mongoose";

export interface IUsers extends Document {
  name: {
    type: string;
  };
  email: {
    type: string;
  };
  createJWT: () => string;
}
