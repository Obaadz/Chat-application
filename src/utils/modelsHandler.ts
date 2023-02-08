import type { Model, ModelStatic, Sequelize } from "sequelize";
import type DefineModel from "../types/defineModel";
import type { UserModel } from "../types/user";
import type { RoomModel } from "../types/room";
import type { MessageModel } from "../types/message";
import type { ParticipantModel } from "../types/participant";
import type { ImageModel } from "../types/image";
import userModel from "../models/user";
import roomModel from "../models/room";
import messageModel from "../models/message";
import participantModel from "../models/participant";
import imageModel from "../models/image";

export default class ModelsHandler {
  User: ModelStatic<UserModel>;
  Room: ModelStatic<RoomModel>;
  Message: ModelStatic<MessageModel>;
  Participant: ModelStatic<ParticipantModel>;
  Image: ModelStatic<ImageModel>;

  constructor(private sequelize: Sequelize) {
    this.User = this.defineModel(userModel);
    this.Room = this.defineModel(roomModel);
    this.Message = this.defineModel(messageModel);
    this.Participant = this.defineModel(participantModel);
    this.Image = this.defineModel(imageModel);

    /* Associations */
    this.User.belongsToMany(this.Room, { through: this.Participant });
    this.Room.belongsToMany(this.User, { through: this.Participant });

    this.Room.hasMany(this.Message);
    this.Message.belongsTo(this.Room);

    this.User.hasMany(this.Message);
    this.Message.belongsTo(this.User);

    this.Message.hasOne(this.Image);
    this.Image.belongsTo(this.Message);
  }

  private defineModel<M extends Model>(model: DefineModel<M>) {
    return this.sequelize.define<M>(model.name, model.attributes, model.options);
  }
}
