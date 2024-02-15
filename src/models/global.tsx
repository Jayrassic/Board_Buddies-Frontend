export type UsersType = {
  _id: string;
  userName: string;
  email: string;
  hash: string;
  admin: boolean;
};

export type GamesType = {
  _id: string;
  owner: UsersType;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  image: string;
  thumbnail: string;
};

export type UserTokenType = {
  email: string;
  token: string;
  userName: string;
};
