import { idClaim } from "../constants/string.constants";
import { DecodedToken } from "../types/global.typing";
import jwt_decode from "jwt-decode";
import { IUserId } from "../types/user.typing";

export const getUserId = () => {
  const token = window.localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwt_decode(token) : null;
  const userId: IUserId = decoded
    ? { Id: decoded[idClaim] }
    : { Id: undefined };
  return userId;
};
