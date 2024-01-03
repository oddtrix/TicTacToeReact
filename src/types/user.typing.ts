export interface IUser {
  userName: string;
  password: string;
  email: string;
  name: string;
  avatarURL: string;
  rating: number;
}
export interface IUserId {
  id: string | undefined;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUserSignInDTO extends IUser {}

export interface IRole {
  role: string | undefined;
}

export interface IUserName {
  username: string | undefined;
}
