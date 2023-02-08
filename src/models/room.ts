import DefineModel from "../types/defineModel";
import { RoomModel } from "../types/room";

const roomModel: DefineModel<RoomModel> = {
  name: "room",
  attributes: {},
  options: { timestamps: false },
};

export default roomModel;
