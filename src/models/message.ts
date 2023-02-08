import { DataTypes } from "sequelize";
import { MessageModel } from "../types/message";
import DefineModel from "../types/defineModel";

const messageModel: DefineModel<MessageModel> = {
  name: "message",
  attributes: {
    message_body: DataTypes.STRING,
  },
  options: { updatedAt: false },
};

export default messageModel;
