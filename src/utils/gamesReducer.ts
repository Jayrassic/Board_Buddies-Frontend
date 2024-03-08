import { GamesType } from "../models/global";

type ActionType =
  | { type: "SET_GAMES"; payload: GamesType[] }
  | { type: "ADD_GAME"; payload: GamesType }
  | { type: "DELETE_GAME"; payload: GamesType };

type GameReturn = {
  games: GamesType[];
};

export const gamesReducer = (state: GameReturn, action: ActionType) => {
  switch (action.type) {
    case "SET_GAMES":
      return {
        games: action.payload,
      };
    case "ADD_GAME":
      return {
        games: [action.payload, ...state.games],
      };
    case "DELETE_GAME":
      return {
        games: state.games.filter((game) => game._id !== action.payload._id),
      };
    default:
      return state;
  }
};
