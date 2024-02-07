import { useEffect, useState } from "react";
import { useGamesContext } from "../hooks/useGamesContext";

export default function AllGamesList() {
  const { games, dispatch } = useGamesContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);

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

  return (
    <div>
      <h2>All Games</h2>
      {isLoading && <h1>Loading</h1>}
      {error && <h1>{error.message}</h1>}
      {games &&
        games.map((game) => {
          return (
            <div key={game._id}>
              <p>{game.name}</p>
            </div>
          );
        })}
    </div>
  );
}
