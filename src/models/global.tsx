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
  playingTime: number;
  image: string;
  thumbnail: string;
  dateAdded: Date;
};

export type UserTokenType = {
  email: string;
  token: string;
  userName: string;
};

export type UserType = {
  user: UserTokenType | null;
};
