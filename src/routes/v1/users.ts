import express from "express";
import UserController from "../../controllers/userController";
import jwtAuth from "../../middleware/jwtAuth";

const usersRoutes = express.Router();

usersRoutes.get("/users/:id/chats", jwtAuth, UserController.getAllChatsById);

export default usersRoutes;
