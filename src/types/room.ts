import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

export type Room = {
  id: string | number;
};

export interface RoomModel
  extends Model<InferAttributes<RoomModel>, InferCreationAttributes<RoomModel>>,
    Optional<Room, "id"> {}
