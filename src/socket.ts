import config from "config";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

/* Config variables */
const corsOrigin = config.get<string>("corsOrigin") || "*";

/**
 * SocketServer class for creating and managing Socket.io server.
 * @class SocketServer
 */
export default class SocketServer {
  public static instance: SocketServer;
  private io: Server;

  constructor(httpServer: HttpServer) {
    console.log("Creating new Socket server...");
    SocketServer.instance = this;
    this.io = new Server(httpServer, {
      cors: {
        origin: corsOrigin,
        credentials: false,
      },
    });

    this.io.on("connect", this.startListeners);
  }

  private startListeners(socket: Socket) {
    console.log("SOCKET ID CONNECTED: " + socket.id);
  }
}
