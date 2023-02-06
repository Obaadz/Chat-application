import config from "config";
import { Sequelize } from "sequelize";
import ModelsHandler from "./modelsHandler";

/* Config variables */
const host = config.get<string>("host"),
  db = config.get<{ name: string; username: string; password: string }>("db");

export default class MySQL {
  static sequelize: Sequelize = new Sequelize(
    db.name,
    db.username,
    db.password || undefined,
    {
      dialect: "mysql",
      host,
      define: {
        underscored: true,
      },
    }
  );
  static readonly models = new ModelsHandler(MySQL.sequelize);

  static async sync() {
    await MySQL.sequelize.sync({ alter: true });
  }

  static async dropAllTables() {
    await MySQL.sequelize.drop();
  }
}
