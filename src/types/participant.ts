import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

type Participant = {
  user_id: number;
  room_id: number;
};

export interface ParticipantModel
  extends Model<
      InferAttributes<ParticipantModel>,
      InferCreationAttributes<ParticipantModel>
    >,
    Participant {}
