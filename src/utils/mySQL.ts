import config from "config";
import { Sequelize } from "sequelize";
import ModelsHandler from "./modelsHandler";

/* Config variables */
const host = config.get<string>("host"),
  db = config.get<{ name: string; username: string; password: string }>("db");

export default class MySQL {
  static readonly sequelize: Sequelize = new Sequelize(
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
  static isConnected: boolean = false;

  static async connect() {
    if (MySQL.isConnected) return true;

    try {
      await MySQL.sequelize.authenticate();

      return (MySQL.isConnected = true);
    } catch (err: any) {
      console.log("Error while connecting to Database: " + err.message);

      return (MySQL.isConnected = false);
    }
  }

  static async disconnect() {
    if (!MySQL.isConnected) return;

    await MySQL.sequelize.close();

    MySQL.isConnected = false;
  }

  static async sync() {
    if (!MySQL.isConnected) throw new Error("Database is not connected...");

    await MySQL.sequelize.sync({ alter: true });
  }

  static async dropAllTables() {
    if (!MySQL.isConnected) throw new Error("Database is not connected...");

    await MySQL.sequelize.drop();
  }
}
