import { IUser } from "./user.typing";

export interface IGame {
  Id: string | undefined;
  GameStatus: string;
  IsPrivate: boolean;
  Winner: IUser;
  GamesPlayers: IUser[];
}

export interface IGameId {
  Id: string | undefined;
}

export interface IGameCreate {
  GameStatus: 0;
  IsPrivate: true;
}
