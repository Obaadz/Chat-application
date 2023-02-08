import { DataTypes } from "sequelize";
import { ImageModel } from "../types/image";
import DefineModel from "../types/defineModel";

const imageModel: DefineModel<ImageModel> = {
  name: "image",
  attributes: {
    content: DataTypes.BLOB,
  },
  options: { timestamps: false },
};

export default imageModel;
