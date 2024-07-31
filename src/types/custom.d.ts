import { Request } from "express";
interface userDetails {
  userId: string;
  name: string;
}
export interface customRequest extends Request {
  user?: userDetails;
}
