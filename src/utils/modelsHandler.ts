import { ModelStatic, Sequelize } from "sequelize";
import userModel from "../models/user";
import roomModel from "../models/room";
import messageModel from "../models/message";
import participantModel from "../models/participant";

export default class ModelsHandler {
  User: ModelStatic<any>;
  Room: ModelStatic<any>;
  Message: ModelStatic<any>;
  Participant: ModelStatic<any>;

  constructor(private sequelize: Sequelize) {
    this.User = sequelize.define(userModel.name, userModel.attributes);
    this.Room = sequelize.define(roomModel.name, roomModel.attributes);
    this.Message = sequelize.define(messageModel.name, messageModel.attributes);
    this.Participant = sequelize.define(
      participantModel.name,
      participantModel.attributes,
      participantModel.options
    );

    /* Associations */
    this.User.belongsToMany(this.Room, { through: this.Participant });
    this.Room.belongsToMany(this.User, { through: this.Participant });

    this.Room.hasMany(this.Message);
    this.Message.belongsTo(this.Room);

    this.User.hasMany(this.Message);
    this.Message.belongsTo(this.User);
  }
}
