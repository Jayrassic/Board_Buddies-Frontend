import { useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { useGamesContext } from "../hooks/useGamesContext";
import GameTable from "../components/GameTable";
import sortReducer from "../utils/sortReducer";
import BGGSearch from "../components/BGG_SearchModal";
import { GamesType } from "../models/global";
import { useAuthContext } from "../hooks/useAuthContext";

import { useParams } from "react-router-dom";

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
  const { user } = useAuthContext();

  const { id } = useParams();
  // Fetches games list from API
  useEffect(() => {
    async function fetchGames() {
      setError(null);
      setIsLoading(true);
      dispatch({ type: "SET_GAMES", payload: null });
      if (id !== undefined) {
        // try {
        const response = await fetch(`http://localhost:3000/games/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.status === 401 || response.status === 404) {
          console.log(json);
          setError(json);
          setIsLoading(false);
        }

        if (response.ok) {
          setError(null);
          dispatch({ type: "SET_GAMES", payload: json });
          setIsLoading(false);
        }
      } else {
        try {
          const response = await fetch("http://localhost:3000/games/");
          const json = await response.json();

          if (!response.ok) {
            setIsLoading(false);
            setError(json);
          }

          if (response.ok) {
            setError(null);
            dispatch({ type: "SET_GAMES", payload: json });
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);
          setError(err as Error);
        }
      }
    }
    fetchGames();
  }, [dispatch, id, user]);

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
    <div className="bg-secondary-subtle min-vh-100">
      <div className="container bg-white p-3 rounded min-vh-100">
        {isLoading && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <h1>{error.message}</h1>}
        {displayedGames && (
          <div className="accordion">
            {!id ? <h2>All Games</h2> : <h2>Your Games</h2>}

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#filter"
                  aria-expanded="false"
                  aria-controls="filter"
                >
                  Filters
                </button>
              </h2>
              <div
                id="filter"
                className="accordion-collapse collapse collapse"
                // data-bs-parent="#accordionExample"
              >
                <form className="accordion-body">
                  <label htmlFor="sort" className="form-label">
                    Sort:{" "}
                  </label>
                  <select
                    name="sort"
                    id="sort"
                    className="form-select"
                    onChange={(e) => sortHandler(e)}
                  >
                    <option value="">Please choose</option>
                    <option value="Game Ascend">Game A-Z</option>
                    <option value="Game Descend">Game Z-A</option>
                    {!id && <option value="Owner Ascend">Owner A-Z</option>}
                    {!id && <option value="Owner Descend">Owner Z-A</option>}
                    <option value="Min Ascend">Min 1-9</option>
                    <option value="Min Descend">Min 9-1</option>
                    <option value="Max Ascend">Max 1-9</option>
                    <option value="Max Descend">Max 9-1</option>
                  </select>
                  {games && !id && (
                    <label className="form-label" htmlFor="checkbox">
                      Sort by Owner:
                    </label>
                  )}
                  <div className="form-check">
                    {games &&
                      !id &&
                      allOwners().map((value) => {
                        return (
                          <div key={value}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name={value}
                              id={value}
                              onClick={(e) => changeNames(e)}
                            />
                            <label className="form-check-label" htmlFor={value}>
                              {value}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="search">
                      Search Game Names:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="search"
                      id="search"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <label className="form-label" htmlFor="number">
                      Number of Players:{" "}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      name="number"
                      id="number"
                      onChange={(e) => setPlayerNumber(+e.target.value)}
                      min="1"
                      max="20"
                    />
                  </div>
                </form>
              </div>
            </div>
            <GameTable data={displayedGames} />
            {id && <BGGSearch />}
          </div>
        )}
      </div>
    </div>
  );
}
