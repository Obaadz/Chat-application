import DefineModel from "../types/defineModel";
import { ParticipantModel } from "../types/participant";

const participantModel: DefineModel<ParticipantModel> = {
  name: "participant",
  attributes: {},
  options: { timestamps: false },
};

export default participantModel;
