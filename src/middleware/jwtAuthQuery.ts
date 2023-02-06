import config from "config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserFromToken } from "../types/user";

const secret = config.get<string>("secret");

interface IRequestWithUser extends Request, UserFromToken {}

export default function (
  request: IRequestWithUser,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.query?.token;

    if (!token || typeof token !== "string") throw new Error("Invalid user token");

    const user: UserFromToken = jwt.verify(token, secret) as JwtPayload;

    if (!user || !user.id) throw new Error("Invalid user token");

    request.user = user;

    next();
  } catch (err: any) {
    response.status(401).send({ message: "Invalid user token", isSuccess: false });
  }
}
