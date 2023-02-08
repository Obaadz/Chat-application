import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

type Message = {
  id: number;
  message_body: string;
};

export interface MessageModel
  extends Model<InferAttributes<MessageModel>, InferCreationAttributes<MessageModel>>,
    Optional<Message, "id"> {}
