import { useEffect, useState } from "react";
import { parseBggXmlApi2ThingResponse } from "@code-bucket/board-game-geek";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function GameDetails() {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    async function searchThing(id) {
      const response = await fetch(
        `https://api.geekdo.com/xmlapi2/thing?id=${id}&versions=1`
      );
      const data = await response.text();
      const bggResponse = parseBggXmlApi2ThingResponse(data);
      setGameData(bggResponse.items[0]);
    }
    try {
      searchThing(id);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  }, [id]);

  async function handleAdd(e) {
    e.preventDefault();

    if (!user) {
      setError("Please log into account");
      return;
    }

    const data = {
      name: gameData.names[0].value,
      description: gameData.description,
      minPlayers: gameData.minplayers,
      maxPlayers: gameData.maxplayers,
      image: gameData.image,
      thumbnail: gameData.thumbnail,
    };

    try {
      const response = await fetch("http://localhost:3000/games", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setError(null);
        console.log("Game Added to User");
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <section>
      {isLoading && <h1>Loading...</h1>}
      {gameData && (
        <>
          {console.log(gameData)}
          <h1>{gameData.names[0].value}</h1>
          <img src={gameData.thumbnail} alt="" />
          <p>
            {gameData.description
              .replace(/&quot;/g, '"')
              .replace(/&#10;/g, "\r\n")}
          </p>
          {user && (
            <button onClick={(e) => handleAdd(e)}>Add Game to your list</button>
          )}
          {error && <h2>{error}</h2>}
        </>
      )}
    </section>
  );
}
