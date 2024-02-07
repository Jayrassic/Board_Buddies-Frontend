import { GamesContext } from "../context/GamesContext";
import { useContext } from "react";

export const useGamesContext = () => {
  const context = useContext(GamesContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
