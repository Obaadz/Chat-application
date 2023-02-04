import { DataTypes } from "sequelize";

const userModel = {
  name: "user",
  attributes: {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
};

export default userModel;
