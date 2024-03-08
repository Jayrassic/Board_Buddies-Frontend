import { UserTokenType, UserType } from "../models/global";

export type ActionType =
  | { type: "LOGIN"; payload: UserTokenType }
  | { type: "LOGOUT"; payload: UserTokenType };

export const authReducer = (state: UserType, action: ActionType): UserType => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
