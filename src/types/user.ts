import type { JwtPayload } from "jsonwebtoken";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserFromToken = JwtPayload & Pick<Partial<User>, "id">;
