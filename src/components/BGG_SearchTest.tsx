import { useEffect, useState } from "react";
import { parseBggXmlApi2SearchResponse } from "@code-bucket/board-game-geek";
import { Link } from "react-router-dom";

export default function BGGSearch() {
  const [query, setQuery] = useState<string>("");
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    async function searchThing(searchTerm: string) {
      const response = await fetch(
        `https://api.geekdo.com/xmlapi2/search?query=${searchTerm}&type=boardgame`
      );
      const data = await response.text();
      const bggResponse = parseBggXmlApi2SearchResponse(data);
      const cutResponse = bggResponse.items.slice(0, 10);
      //   await cutResponse.forEach(async (item) => {
      //     const image = await getPic(item.id);
      //     item.thumbnail = image;
      //   });
      setSearchData(cutResponse);
    }
    searchThing(query);
  }, [query]);

  return (
    <div>
      <label htmlFor="gameSearch">Search for a game:</label>
      <input
        type="text"
        name="gameSearch"
        id="gameSearch"
        onChange={(e) => setQuery(e.target.value)}
      />
      {searchData &&
        searchData.map((game) => {
          return (
            <Link to={`/game/${game.id}`}>
              <p>{game.name}</p>
            </Link>
          );
        })}
    </div>
  );
}
