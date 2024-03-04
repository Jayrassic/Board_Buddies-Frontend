import { useEffect, useState } from "react";
import { parseBggXmlApi2SearchResponse } from "@code-bucket/board-game-geek";
import { Link, useNavigate } from "react-router-dom";

export default function BGGSearch() {
  const [query, setQuery] = useState<string>("");
  const [searchData, setSearchData] = useState();

  // useEffect(() => {
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
  //   searchThing(query);
  // }, [query]);

  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Game
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="addGameModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addGameModal">
                Search Game
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label" htmlFor="gameSearch">
                Search for a game:
              </label>
              <input
                className="form-control"
                type="text"
                name="gameSearch"
                id="gameSearch"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-3 mb-2"
                onClick={() => searchThing(query)}
              >
                Search
              </button>
              {searchData && searchData.length == 0 && (
                <h2>No Results, please try again</h2>
              )}
              {searchData &&
                searchData.map((game) => {
                  return (
                    <Link
                      to={`/game/${game.id}`}
                      data-bs-dismiss="modal"
                      onClick={() => navigate(`/game/${game.id}`)}
                    >
                      <p className="link-primary">{game.name}</p>
                    </Link>
                  );
                })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
