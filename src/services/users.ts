import MySQL from "../utils/mySQL";

const { models } = MySQL;

export async function getAllUserChatsById(id: string) {
  const chats = await models.Room.findAll({
    attributes: ["id"],
    include: [
      {
        model: models.Message,
        attributes: ["user_id", "message_body"],
        where: { user_id: id },
      },
      {
        model: models.User,
        attributes: ["first_name", "last_name"],
        through: { attributes: ["user_id"] },
      },
    ],
  });

  return chats;
}
