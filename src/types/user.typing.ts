import { IId } from "./global.typing";

export interface IUser extends IId {
  UserName: string;
  Password: string;
  Email: string;
  Name: string;
  AvatarURL: string;
  Rating: number;
}

export interface IUserLoginDTO {
  Email: string;
  Password: string;
}

export interface IUserSignInDTO extends IUser { }

export interface IRole {
  Role: string | undefined;
}

export interface IUserName {
  UserName: string | undefined;
}
