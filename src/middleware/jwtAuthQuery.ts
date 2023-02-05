import config from "config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = config.get<string>("secret");

export default function (request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.query?.token;

    if (!token || typeof token !== "string") throw new Error("Invalid user token");

    const user = jwt.verify(token, secret);

    if (!user) throw new Error("Invalid user token");

    request.body.user = user;

    next();
  } catch (err: any) {
    response.status(401).send({ message: "Invalid user token", isSuccess: false });
  }
}
