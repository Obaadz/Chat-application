import { DataTypes } from "sequelize";
import DefineModel from "../types/defineModel";
import { UserModel } from "../types/user";

const userModel: DefineModel<UserModel> = {
  name: "user",
  attributes: {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: { timestamps: false },
};

export default userModel;
