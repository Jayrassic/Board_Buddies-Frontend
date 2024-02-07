import { createContext, useReducer } from "react";

export const gamesReducer = (state, action) => {
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

type ChildrenProps = { children: React.ReactNode };

export const GamesContext = createContext();

export const GameContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(gamesReducer, { games: null });

  return (
    <GamesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GamesContext.Provider>
  );
};
