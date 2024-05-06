import { idClaim } from "../constants/string.constants";
import { DecodedToken, IId } from "../types/global.typing";
import jwt_decode from "jwt-decode";

export const getUserId = () => {
  const token = window.localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwt_decode(token) : null;
  const userId: IId = decoded
    ? { Id: decoded[idClaim] }
    : { Id: undefined };
  return userId;
};