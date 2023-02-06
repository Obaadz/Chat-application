import config from "config";
import { expressjwt, Request as JwtAuthRequest } from "express-jwt";

const secret = config.get<string>("secret");

const jwtAuth = expressjwt({
  secret,
  algorithms: ["HS256"],
});

export type { JwtAuthRequest };
export default jwtAuth;
