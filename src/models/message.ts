import { DataTypes } from "sequelize";

const messageModel = {
  name: "message",
  attributes: {
    message_body: DataTypes.STRING,
  },
};

export default messageModel;
