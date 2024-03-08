import { createContext, useReducer, Dispatch } from "react";
import { GamesType } from "../models/global";
import { gamesReducer } from "../utils/gamesReducer";

const initialState = { games: [], dispatch: () => {} };

type ChildrenProps = { children: React.ReactNode };

type DispatchType =
  | { type: "SET_GAMES"; payload: GamesType[] }
  | { type: "ADD_GAME"; payload: GamesType }
  | { type: "DELETE_GAME"; payload: GamesType };

export type StateType = {
  games: GamesType[];
  dispatch: Dispatch<DispatchType>;
};

export const GamesContext = createContext<StateType>(initialState);

export const GameContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(gamesReducer, initialState);

  return (
    <GamesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};
