import { useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { useGamesContext } from "../hooks/useGamesContext";
import GameTable from "./GameTable";
import sortReducer from "../utils/sortReducer";
import BGGSearch from "./BGG_SearchModal";
import { GamesType } from "../models/global";
import { useAuthContext } from "../hooks/useAuthContext";

import { useParams } from "react-router-dom";

type AllOwnerType = string[] | false;

export default function GamesList() {
  const { games, dispatch } = useGamesContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  // Stores usernames that will be used to filter
  const [namesArray, setNamesArray] = useState<string[]>([]);
  // Stores string that will be used to filter games names.
  const [query, setQuery] = useState<string>("");
  // Stores user selected time limit
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  // Stores the number input into the number of players filter
  const [playerNumber, setPlayerNumber] = useState<number>(0);
  // Stores the sorted original array to be fed to display games
  const [sortedGames, sortDispatch] = useReducer(sortReducer, games);
  // All filters applied for games to show
  const [displayedGames, setDisplayedGames] = useState<GamesType[] | null>(
    games
  );
  // Stores a list of owners to be used in owner filter
  const [allOwnersArray, setAllOwnersArray] = useState<AllOwnerType>(false);

  const { user } = useAuthContext();

  const { id } = useParams();

  // Fetches games list from API
  useEffect(() => {
    async function fetchGames() {
      if (id !== undefined) {
        if (user) {
          const response = await fetch(
            `https://boardbuddies-api-production.up.railway.app/games/${id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
              mode: "cors",
              credentials: "include",
            }
          );
          const json = await response.json();

          if (response.status === 401 || response.status === 404) {
            setError(json.error);
            setIsLoading(false);
          }

          if (response.ok) {
            setError(null);
            dispatch({ type: "SET_GAMES", payload: json });
            setDisplayedGames(json);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
          setError("Please login to view page");
        }
      } else {
        try {
          const response = await fetch(
            "https://boardbuddies-api-production.up.railway.app/games/",
            {
              mode: "cors",
              credentials: "include",
            }
          );
          const json = await response.json();

          if (!response.ok) {
            setIsLoading(false);
            setError(json);
          }

          if (response.ok) {
            setError(null);
            dispatch({ type: "SET_GAMES", payload: json });
            setDisplayedGames(json);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);
          setError((err as Error).message);
        }
      }
    }
    fetchGames();
  }, [dispatch, id, user]);

  // Sets dispatch once games has loaded
  useEffect(() => {
    if (games) {
      sortDispatch({ type: "Newest Additions", payload: games });
    }
  }, [games]);

  // Controls events for sorting onChange.
  function sortHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    sortDispatch({
      type: e.target.value,
      payload: games,
    });
  }

  // Gathers user names to display in filter list
  useEffect(() => {
    function allOwners(): void {
      if (games) {
        const ownersArray: string[] = games.map(
          (game: GamesType) => game.owner.userName
        );
        const ownersList = [...new Set(ownersArray)];
        setAllOwnersArray(ownersList);
      } else {
        setAllOwnersArray(false);
      }
    }
    allOwners();
  }, [games]);

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

  // Handler function for when filter button is pushed. Uses the selected names to search the sortedData array.
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

  const numberOfPlayers = useCallback(
    (originalArray: GamesType[], num: number) => {
      if (playerNumber !== 0) {
        return originalArray.filter((el) => {
          return num >= el.minPlayers && num <= el.maxPlayers;
        });
      }
    },
    [playerNumber]
  );

  function max(data: GamesType[]): string {
    if (!data) {
      return "300";
    }
    if (data.length === 1) {
      return data[0].playingTime.toString();
    }
    const answer: string = data
      .reduce((acc, value) => {
        return (acc = acc > value.playingTime ? acc : value.playingTime);
      }, 0)
      .toString();

    return answer;
  }

  const filterTime = useCallback(
    (array: GamesType[]) => {
      if (timeLimit !== 0 && timeLimit !== null) {
        return array.filter((item) => {
          return item.playingTime <= timeLimit;
        });
      }
    },
    [timeLimit]
  );

  useEffect(() => {
    if (sortedGames) {
      let modifiedData: GamesType[] | undefined = [...sortedGames];

      if (namesArray) {
        modifiedData = filterNames;
      }

      if (query !== "" && modifiedData) {
        modifiedData = searchData(modifiedData);
      }

      if (timeLimit !== null && modifiedData) {
        if (timeLimit >= 5) {
          modifiedData = filterTime(modifiedData);
        }
      }
      if (playerNumber !== 0 && modifiedData) {
        modifiedData = numberOfPlayers(modifiedData, playerNumber);
      }

      if (modifiedData === undefined) {
        setDisplayedGames(null);
        setError("No games matching");
      } else {
        setDisplayedGames(modifiedData);
      }
    }
  }, [
    filterNames,
    namesArray,
    query,
    searchData,
    sortedGames,
    playerNumber,
    numberOfPlayers,
    timeLimit,
    filterTime,
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
        {error && <h1 className=" text-center mt-5">{error}</h1>}
        {!isLoading && !error && (
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
              <div id="filter" className="accordion-collapse collapse collapse">
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
                    <option value="Newest Additions">Newest Additions</option>
                    <option value="Game Ascend">Game A-Z</option>
                    <option value="Game Descend">Game Z-A</option>
                    {!id && <option value="Owner Ascend">Owner A-Z</option>}
                    {!id && <option value="Owner Descend">Owner Z-A</option>}
                    <option value="Min Ascend">Min 1-9</option>
                    <option value="Min Descend">Min 9-1</option>
                    <option value="Max Ascend">Max 1-9</option>
                    <option value="Max Descend">Max 9-1</option>
                    <option value="Longest Playtime">Longest Playtime</option>
                    <option value="Shortest Playtime">Shortest Playtime</option>
                  </select>
                  {games && !id && <p className=" mb-2">Sort by Owner:</p>}
                  <div className="form-check">
                    {games &&
                      !id &&
                      allOwnersArray &&
                      allOwnersArray.map((value, index) => {
                        return (
                          <div key={index}>
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
                  <div>
                    <label htmlFor="timeRange" className="form-label">
                      Max Time (minutes) :{" "}
                    </label>
                    <p className="mb-0 fw-bold">
                      {timeLimit === null || timeLimit < 5 ? "None" : timeLimit}
                    </p>
                    <input
                      type="range"
                      className="form-range"
                      defaultValue="0"
                      min="0"
                      max={games && max(games)}
                      step="5"
                      id="timeRange"
                      onChange={(e) => setTimeLimit(+e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            {displayedGames && <GameTable data={displayedGames} />}
            {(displayedGames === null || displayedGames.length === 0) && (
              <h1>No Matching Games</h1>
            )}
          </div>
        )}
        {id && !isLoading && <BGGSearch />}
      </div>
    </div>
  );
}
