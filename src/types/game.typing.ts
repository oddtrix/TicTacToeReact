import { IUser } from "./user.typing";

export interface IGame {
  id: string | undefined;
  gameStatus: string;
  isPrivate: boolean;
  winner: IUser;
  gamesPlayers: IUser[];
}

export interface IGameId {
  id: string | undefined;
}

export interface IGameCreate {
  gameStatus: 0;
  isPrivate: true;
}
