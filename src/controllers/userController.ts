import { Response } from "express";
import { JwtAuthExpressRequest } from "../middleware/jwtAuth";
import { getAllUserChatsById } from "../services/users";
import createDumpDataHide from "../utils/createDumpData.hide";
import { UserFromToken } from "./../types/user";

export default class UserController {
  static async getAllChatsById(
    request: JwtAuthExpressRequest<UserFromToken>,
    response: Response
  ) {
    const userIdParams = request.params.id;
    const user = request.auth;

    createDumpDataHide();

    try {
      if (!user?.id)
        throw new Error(
          "The token provided is invalid or does not include the necessary 'id' property"
        );
      if (Number(userIdParams) !== Number(user.id))
        throw new Error(`You don't have access to see user (${userIdParams}) chats`);

      const chats = await getAllUserChatsById(userIdParams);

      response.send({ chats });
    } catch (err: any) {
      response.status(401).send(err.message || "Server error");
    }
  }
}
