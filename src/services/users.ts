import MySQL from "../utils/mySQL";

const { models } = MySQL;

/* Retrieve chats with messages for a user by its id */
export async function getAllUserChatsById(id: string | number) {
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
