import express from "express";
import UserController from "../../controllers/userController";
import { jwtAuthExpress } from "../../middleware/jwtAuth";

const usersRoutes = express.Router();

usersRoutes.get("/users/:id/chats", jwtAuthExpress, UserController.getAllChatsById);

export default usersRoutes;
