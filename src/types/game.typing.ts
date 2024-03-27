import { IId } from "./global.typing";
import { IUser } from "./user.typing";

export interface IGame extends IId{
  GameStatus: number;
  IsPrivate: boolean;
  Winner: IUser;
  GamesPlayers: GamesPlayer[];
  Field: IField;
  StrokeNumber: number;
  PlayerQueueId: string;
}

export interface GamesPlayer {
  PlayerId: IId,
  Player: IUser,
  GameId: IId,
  Game: IGame
}
interface IField extends IId{
  FieldMoves: IFieldMoves;
}

interface IFieldMoves extends IId{
  FieldId: string | undefined;
  Cells: ICell[];
}

interface ICell extends IId{
  X: number;
  Y: number;
  Value: number;
  FieldId: string | undefined;
  FieldMovesId: string | undefined;
  PlayerId: string | undefined;
}

export interface IGameCreate {
  GameStatus: 0;
  IsPrivate: true;
}
