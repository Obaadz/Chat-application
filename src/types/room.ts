import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

type Room = {
  id: number;
};

export interface RoomModel
  extends Model<InferAttributes<RoomModel>, InferCreationAttributes<RoomModel>>,
    Optional<Room, "id"> {}
