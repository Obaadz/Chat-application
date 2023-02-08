import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  ModelOptions,
} from "sequelize";

type DefineModel<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>> = {
  name: string;
  attributes: ModelAttributes<M>;
  options?: ModelOptions;
};

export default DefineModel;
