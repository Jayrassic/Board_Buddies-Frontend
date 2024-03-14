import { useState } from "react";
import {
  parseBggXmlApi2SearchResponse,
  BggSearch,
} from "@code-bucket/board-game-geek";
import { Link, useNavigate } from "react-router-dom";

export default function BGGSearch() {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<null | BggSearch[]>(null);

  async function searchThing(
    e: React.FormEvent<HTMLFormElement>,
    searchTerm: string
  ) {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `https://api.geekdo.com/xmlapi2/search?query=${searchTerm}&type=boardgame,boardgameexpansion`
    );
    const data = await response.text();
    const bggResponse = parseBggXmlApi2SearchResponse(data);
    setSearchData(bggResponse.items);
    setIsLoading(false);
  }

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
        tabIndex={-1}
        aria-labelledby="addGameModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
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
              <form
                className="centered"
                onSubmit={(e) => searchThing(e, query)}
              >
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
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary mt-3 mb-2"
                >
                  Search
                </button>
              </form>
              {searchData && searchData.length == 0 && (
                <h2>No Results, please try again</h2>
              )}

              {/* Loading Spinner */}
              {isLoading && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchData &&
                !isLoading &&
                searchData.map((game, index) => {
                  return (
                    <Link
                      key={index}
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
