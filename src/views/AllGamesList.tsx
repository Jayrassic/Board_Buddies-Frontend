import { useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { useGamesContext } from "../hooks/useGamesContext";
import GameTable from "../components/GameTable";
import sortReducer from "../utils/sortReducer";
import { GamesType } from "../models/global";

export default function AllGamesList() {
  const { games, dispatch } = useGamesContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

  // Stores usernames that will be used to filter
  const [namesArray, setNamesArray] = useState<string[]>([]);
  // Stores string that will be used to filter games names.
  const [query, setQuery] = useState<string>("");

  const [sortedGames, sortDispatch] = useReducer(sortReducer, games);
  const [displayedGames, setDisplayedGames] = useState(games);

  // Fetches games list from API
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("http://localhost:3000/games/");
        const json = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(json);
        }

        if (response.ok) {
          dispatch({ type: "SET_GAMES", payload: json });
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err as Error);
      }
    }
    fetchGames();
  }, [dispatch]);

  // Sets dispatch once games has loaded
  useEffect(() => {
    if (games) {
      sortDispatch({ type: "Game Ascend", payload: games });
    }
    setDisplayedGames(games);
  }, [games]);

  // Controls events for sorting onChange.
  function sortHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    sortDispatch({
      type: e.target.value,
      payload: games,
    });
  }

  // Gathers names to display in filter list
  function allOwners(): string[] | undefined {
    if (games) {
      const ownersArray: string[] = games.map(
        (game: GamesType) => game.owner.userName
      );
      const ownersList = [...new Set(ownersArray)];
      return ownersList;
    }
  }

  // Event listener for adding and removing names to namesArray.
  const changeNames = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLInputElement;
    const newNamesArray: string[] = [...namesArray];
    if (eventTarget.checked) {
      newNamesArray.push(eventTarget.name);
      setNamesArray(newNamesArray);
    } else {
      const nameLocation = newNamesArray.findIndex(
        (el) => el === eventTarget.name
      );
      newNamesArray.splice(nameLocation, 1);
      setNamesArray(newNamesArray);
    }
  };

  //Handler function for when filter button is pushed. Uses the selected names to search the sortedData array.
  const filterNames = useMemo(() => {
    if (sortedGames) {
      const newArray = [...sortedGames];
      const answer = newArray.filter((el) =>
        namesArray.includes(el.owner.userName)
      );
      if (answer.length === 0) {
        return sortedGames;
      } else {
        return answer;
      }
    }
  }, [namesArray, sortedGames]);

  // Callback function used to filter by search term.
  const searchData = useCallback(
    (array: GamesType[]) => {
      if (query !== "") {
        return array.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
      }
    },
    [query]
  );

  const [playerNumber, setPlayerNumber] = useState<number>(0);

  const numberOfPlayers = useCallback(
    (originalArray: GamesType[], num: number) => {
      if (playerNumber === 0) {
        return originalArray;
      }
      return originalArray.filter((el) => {
        return num >= el.minPlayers && num <= el.maxPlayers;
      });
    },
    [playerNumber]
  );

  useEffect(() => {
    if (sortedGames) {
      let modifiedData: GamesType[] = [...sortedGames];

      if (sortedGames) {
        modifiedData = [...sortedGames];
      }

      if (namesArray) {
        modifiedData = filterNames;
      }

      if (query !== "") {
        modifiedData = searchData(modifiedData);
      }

      if (playerNumber !== 0) {
        modifiedData = numberOfPlayers(modifiedData, playerNumber);
      }

      setDisplayedGames(modifiedData);
    }
  }, [
    filterNames,
    namesArray,
    query,
    searchData,
    sortedGames,
    playerNumber,
    numberOfPlayers,
  ]);

  return (
    <div>
      <h2>All Games</h2>
      <label htmlFor="sort">Sort: </label>
      <select name="sort" id="sort" onChange={(e) => sortHandler(e)}>
        <option value="">Please choose</option>
        <option value="Game Ascend">Game A-Z</option>
        <option value="Game Descend">Game Z-A</option>
        <option value="Owner Ascend">Owner A-Z</option>
        <option value="Owner Descend">Owner Z-A</option>
        <option value="Min Ascend">Min 1-9</option>
        <option value="Min Descend">Min 9-1</option>
        <option value="Max Ascend">Max 1-9</option>
        <option value="Max Descend">Max 9-1</option>
      </select>
      <form>
        <div className="name">
          {games &&
            allOwners().map((value) => {
              return (
                <>
                  <label htmlFor={value}>{value}</label>
                  <input
                    type="checkbox"
                    name={value}
                    id={value}
                    onClick={(e) => changeNames(e)}
                  />
                </>
              );
            })}
        </div>
        <div>
          <label htmlFor="search">Search Game Names: </label>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <label htmlFor="number">Number of Players: </label>
          <input
            type="number"
            name="number"
            id="number"
            onChange={(e) => setPlayerNumber(+e.target.value)}
            min="0"
            max="20"
          />
        </div>
      </form>
      {isLoading && <h1>Loading</h1>}
      {error && <h1>{error.message}</h1>}
      {displayedGames && <GameTable data={displayedGames} />}
    </div>
  );
}
