import { IId } from "./global.typing";
import { IUser } from "./user.typing";

export interface IGame extends IId{
  GameStatus: number;
  IsPrivate: boolean;
  Winner: IUser;
  GamesPlayers: IGamesPlayer[];
  Field: IField;
  Chat: IChat;
  StrokeNumber: number;
  PlayerQueueId: string;
  GameCreatorId: string,
}

export interface IGamesPlayer {
  PlayerId: IId,
  Player: IUser,
  GameId: IId,
  Game: IGame
}

export interface IChat extends IId{
  Messages: IMessages[];
}
export interface IMessages extends IId{
  MessageBody: string,
  DateTime: string,
  ChatId: IId,
  PlayerId: IId
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

export interface IHistory {
  Page: number,
  PageSize:number,
  TotalPages: number,
  Items: IGamesPlayer[],
}