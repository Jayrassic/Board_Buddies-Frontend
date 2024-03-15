import * as sortFunctions from "../utils/sortFunctions";
import { GamesType } from "../models/global";

const initialState: GamesType[] = [];

type ActionType = { type: string; payload: GamesType[] };

export default function sortReducer(
  state: typeof initialState,
  action: ActionType
) {
  switch (action.type) {
    case "Game Ascend":
      return sortFunctions.sortGameNameAscending(action.payload);
    case "Game Descend":
      return sortFunctions.sortGameNameDescending(action.payload);
    case "Owner Ascend":
      return sortFunctions.sortGameOwnerAscending(action.payload);
    case "Owner Descend":
      return sortFunctions.sortGameOwnerDescending(action.payload);
    case "Min Ascend":
      return sortFunctions.sortMinPlayersAscending(action.payload);
    case "Min Descend":
      return sortFunctions.sortMinPlayersDescending(action.payload);
    case "Max Ascend":
      return sortFunctions.sortMaxPlayersAscending(action.payload);
    case "Max Descend":
      return sortFunctions.sortMaxPlayersDescending(action.payload);
    case "Newest Additions":
      return sortFunctions.sortDateAddedAscending(action.payload);

    default:
      return state;
  }
}
