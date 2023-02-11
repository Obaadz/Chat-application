import config from "config";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import v1Routes from "./routes/v1/index";
import SocketServer from "./socket";
import MySQL from "./utils/mySQL";

/* Config variables */
const port = config.get<number>("port"),
  host = config.get<string>("host");

/* Server handling */
const app = express(),
  httpServer = createServer(app);

/* Create socket server */
SocketServer.initalize(httpServer);

/* Express configuration for the body of the request */
const bodyParser = {
  urlencoded: express.urlencoded({ limit: "10mb", extended: true }),
  json: express.json({ limit: "10mb" }),
};

/* Apply Express middleware for body parsing and CORS handling */
app.use(bodyParser.urlencoded);
app.use(bodyParser.json);
app.use(cors());

/* Apply routes versioning to the express application */
app.use(v1Routes);

/* Sync database models changes */
// MySQL.sync();

/* Start Listening */
httpServer.listen(port, async () => {
  console.log(`Server is listening on ${host}:${port}`);
});
