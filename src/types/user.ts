import type { JwtPayload } from "jsonwebtoken";
import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserFromToken = JwtPayload & Pick<Partial<User>, "id">;

export interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    Optional<User, "id"> {}
