import { Sequelize } from "sequelize";
import MySQL from "../utils/mySQL";
import { Room } from "../types/room";

const { models } = MySQL;

/* Retrieve a list of Rooms for a user by its id, each room contains only the room id */
export async function getAllRoomsIdForUserById(id: string | number, literal?: boolean) {
  const rooms = (await models.Participant.findAll({
    attributes: [
      [literal ? Sequelize.literal("CONCAT('room-', room_id)") : "room_id", "id"],
    ],
    where: { user_id: id },
    raw: true,
  })) as Partial<Room>[];

  return rooms;
}
