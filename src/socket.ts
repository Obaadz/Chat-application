import config from "config";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { jwtAuthSocket } from "./middleware/jwtAuth";
import { getAllRoomsIdForUserById } from "./services/rooms";
import { EVENTS } from "./types/enums";
import { MessageFromSocket } from "./types/message";
import { Room } from "./types/room";

/* Config variables */
const corsOrigin = config.get<string>("corsOrigin") || "*",
  maxBufferSize = config.get<number>("maxBufferSize");
/**
 * SocketServer class for creating and managing Socket.io server.
 * @class SocketServer
 */
export default class SocketServer {
  private static io: Server;

  static async initalize(httpServer: HttpServer) {
    SocketServer.io = new Server(httpServer, {
      maxHttpBufferSize: maxBufferSize,
      cors: {
        origin: corsOrigin,
        credentials: false,
      },
    });

    /* Authenticate the JWT token then start the connection or throw error */
    SocketServer.io.use(jwtAuthSocket);

    SocketServer.io.on("connect", this.startListeners);
  }

  private static async startListeners(socket: Socket) {
    console.log("SOCKET ID CONNECTED: " + socket.id);

    const userId: number = Number(socket.handshake.query.user_id);
    const userRooms = await getAllRoomsIdForUserById(userId, true);

    SocketServer.joinToRooms(socket, userRooms);

    socket.on(
      EVENTS.sendMessage,
      async (targetRoomId: number, message: MessageFromSocket) => {
        SocketServer.sendMessage(socket, targetRoomId, message);
      }
    );
  }

  private static joinToRooms(socket: Socket, rooms: Partial<Room>[]) {
    const roomsString = rooms.map((room) => room?.id) as string[];

    socket.join(roomsString);
  }

  private static async sendMessage(
    socket: Socket,
    targetRoomId: number,
    message: MessageFromSocket
  ) {
    socket.to(`room-${targetRoomId}`).emit(EVENTS.receiveMessage, message);
  }
}
