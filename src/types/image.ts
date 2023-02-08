import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

type Image = {
  id: number;
  content: Buffer;
};

export interface ImageModel
  extends Model<InferAttributes<ImageModel>, InferCreationAttributes<ImageModel>>,
    Optional<Image, "id"> {}
