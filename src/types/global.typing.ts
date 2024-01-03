import { IGame } from "./game.typing";
import { IUser, IUserLoginDTO } from "./user.typing";

export interface FormData extends IUserLoginDTO {}

export interface DecodedToken {
  [key: string]: string;
}

export enum Loading {
  "Idle",
  "Loading",
  "Loaded",
  "Error",
  "Success",
}

export interface IUserState {
  data: IUser | null;
  status: Loading;
}

export interface IGameState {
  data: IGame | null;
  status: Loading;
}
