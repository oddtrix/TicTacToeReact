import { IGame } from "./game.typing";
import { IUser, IUserLoginDTO } from "./user.typing";

export interface IId {
  Id: string | undefined;
}

export interface FormData extends IUserLoginDTO { }

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
  Data: IUser | null;
  History: null;
  Status: Loading;
}

export interface IGameState {
  Data: IGame | null;
  Status: Loading;
}


export interface IConnectionState {
  ConnectionId: IGame | null;
  Status: Loading;
}

export enum GameResult{
  "Win",
  "Lose",
  "Draw",
  "Abandoned"
}